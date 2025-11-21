import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase.from("favorites").select("*");
    setFavorites(data);
  };

  return (
    <div className="container">
      <h2 className="section-title">⭐ Favorite Profiles</h2>

      {favorites?.map((f) => (
        <div key={f.id} className="list-card">
          <div className="list-item">
            <img src={f.avatar} alt="avatar" />

            <div>
              <div className="list-user">{f.username}</div>
              <div className="list-meta">{f.followers} followers</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
