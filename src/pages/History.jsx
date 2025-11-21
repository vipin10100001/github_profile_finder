import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase
      .from("history")
      .select("*")
      .order("id", { ascending: false });

    setHistory(data);
  };

  return (
    <div className="container">
      <h2>⏱ Search History</h2>
  
      {history?.map((h) => (
        <div key={h.id} className="list-card">
          <div style={{ fontWeight: 600 }}>{h.username}</div>
          <small style={{ color: "#6b7280" }}>{h.searched_at}</small>
        </div>
      ))}
    </div>
  );
    }  
