export default function SearchBar({ username, setUsername, onSearch }) {
  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search GitHub username..."
      />
      <button className="search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}
