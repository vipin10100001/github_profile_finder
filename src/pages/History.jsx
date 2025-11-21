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
    <div>
      <h2>Search History</h2>
      {history?.map((h) => (
        <p key={h.id}>{h.username}</p>
      ))}
    </div>
  );
}
