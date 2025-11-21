import "../styles/skeleton.css";

export default function SkeletonRepos() {
  return (
    <div className="repo-grid">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="skeleton skeleton-repo-card"></div>
      ))}
    </div>
  );
}
