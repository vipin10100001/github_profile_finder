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
      <h2>⭐ Favorite Profiles</h2>
  
      {favorites?.map((f) => (
        <div key={f.id} className="list-card">
          <div className="list-item">
            <img src={f.avatar} alt="" />
            <div>
              <div style={{ fontWeight: 600 }}>{f.username}</div>
              <small>{f.followers} followers</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
    }  
