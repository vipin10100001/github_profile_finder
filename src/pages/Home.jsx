import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ProfileCard from "../components/ProfileCard";
import RepoList from "../components/RepoList";
import { supabase } from "../supabase";

export default function Home() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  const fetchGitHub = async () => {
    if (!username.trim()) {
      alert("Please enter a GitHub username.");
      return;
    }

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("GitHub user not found");

      const data = await res.json();
      setProfile(data);

      // Fetch repos
      const repoRes = await fetch(data.repos_url);
      const repoData = await repoRes.json();
      setRepos(repoData);

      // Save history to supabase
      await supabase.from("history").insert({ username });

    } catch (err) {
      console.error("GitHub API error:", err);
      alert("User not found or GitHub API error");
      setProfile(null);
      setRepos([]);
    }
  };

  return (
    <>
      <SearchBar 
        username={username} 
        setUsername={setUsername} 
        onSearch={fetchGitHub} 
      />

      <ProfileCard profile={profile} />
      <RepoList repos={repos} />
    </>
  );
}
