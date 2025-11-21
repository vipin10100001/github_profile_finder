import { supabase } from "../supabase";

export default function ProfileCard({ profile }) {
  if (!profile) return null;

  const addFavorite = async () => {
    await supabase.from("favorites").insert({
      username: profile.login,
      avatar: profile.avatar_url,
      followers: profile.followers,
    });
    alert("Added to Favorites!");
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={profile.avatar_url} alt=" " />
        <div>
          <h2>{profile.login}</h2>
          <p>{profile.name}</p>
          <p>{profile.bio}</p>
        </div>
      </div>

      <div className="profile-stats">
        <p>Followers: {profile.followers}</p>
        <p>Following: {profile.following}</p>
        <p>Repos: {profile.public_repos}</p>
      </div>

      <button onClick={addFavorite}>⭐ Add to Favorites</button>
    </div>
  );
}
