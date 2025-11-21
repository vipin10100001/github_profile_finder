export default function SearchBar({ username, setUsername, onSearch }) {
    return (
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
        />
        <button onClick={onSearch}>Search</button>
      </div>
    );
  }
  