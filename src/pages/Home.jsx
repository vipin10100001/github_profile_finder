import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ProfileCard from "../components/ProfileCard";
import RepoList from "../components/RepoList";
import SkeletonProfile from "../components/SkeletonProfile";
import SkeletonRepos from "../components/SkeletonRepos";
import { supabase } from "../supabase";

export default function Home() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGitHub = async () => {
    if (!username.trim()) return alert("Enter username");

    setLoading(true);
    setProfile(null);
    setRepos([]);

    try {
      // Fetch user
      const res = await fetch(`https://api.github.com/users/${username}`);

      if (res.status === 404) {
        alert("User not found");
        setLoading(false);
        return;
      }

      if (res.status === 403) {
        alert("GitHub API rate limit exceeded. Try again later.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setProfile(data);

      // Fetch repos
      const repoRes = await fetch(data.repos_url);

      if (repoRes.status === 403) {
        alert("Rate limit exceeded while fetching repositories.");
        setLoading(false);
        return;
      }

      const repoData = await repoRes.json();
      setRepos(repoData);

      // Save to Supabase history
      await supabase.from("history").insert({ username });

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        GitHub Profile Finder
      </h1>

      <SearchBar
        username={username}
        setUsername={setUsername}
        onSearch={fetchGitHub}   // FIXED
      />

      {/* ---- LOADING SKELETONS ---- */}
      {loading && (
        <>
          <SkeletonProfile />
          <SkeletonRepos />
        </>
      )}

      {/* ---- REAL DATA ---- */}
      {!loading && profile && <ProfileCard profile={profile} />}
      {!loading && repos.length > 0 && <RepoList repos={repos} />}
    </div>
  );
}
