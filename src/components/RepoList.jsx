export default function RepoList({ repos }) {
    if (!repos) return null;
  
    return (
      <div className="repo-grid">
        {repos.map((repo) => (
          <div className="repo-card" key={repo.id}>
            <h3>{repo.name}</h3>
            <small>{repo.language}</small>
            <p>⭐ {repo.stargazers_count}</p>
          </div>
        ))}
      </div>
    );
  }
  