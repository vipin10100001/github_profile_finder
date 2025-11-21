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
      <h2 className="section-title">📜 Search History</h2>

      {history?.map((h) => (
        <div key={h.id} className="list-card">
          <div className="list-item">
            <div className="list-user">{h.username}</div>
            <div className="time-badge">
              {new Date(h.searched_at).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
