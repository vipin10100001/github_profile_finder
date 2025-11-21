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
    if (!username.trim()) return alert("Enter username");
  
    try {
      const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const res = await fetch(`https://api.github.com/users/${username}`, {
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});
      
  
      if (!res.ok) throw new Error("User not found");
  
      const data = await res.json();
      setProfile(data);
  
      const repoRes = await fetch(data.repos_url, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
      
  
      const repoData = await repoRes.json();
      setRepos(repoData);
  
      await supabase.from("history").insert({ username });
  
    } catch (err) {
      console.error("GitHub API error:", err);
      alert("GitHub API failed. Probably rate limit.");
    }
  };
  

  return (
    <div>
    <h1>GitHub Profile Finder </h1>
      <SearchBar 
        username={username} 
        setUsername={setUsername} 
        onSearch={fetchGitHub} 
      />

      <ProfileCard profile={profile} />
      <RepoList repos={repos} />
    </div>
  );
}
