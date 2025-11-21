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
    <div>
      <h2>Favorite Profiles</h2>

      {favorites?.map((f) => (
        <div key={f.id} style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <img src={f.avatar} width="40"  alt="Avatar"/>
          <p>{f.username}</p>
        </div>
      ))}
    </div>
  );
}
