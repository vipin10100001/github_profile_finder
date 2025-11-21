import "../styles/skeleton.css";

export default function SkeletonProfile() {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="skeleton skeleton-avatar"></div>

        <div style={{ flex: 1 }}>
          <div className="skeleton skeleton-line" style={{ width: "50%" }}></div>
          <div className="skeleton skeleton-line" style={{ width: "70%" }}></div>
          <div className="skeleton skeleton-line skeleton-small"></div>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line" style={{ width: "40%" }}></div>
      </div>
    </div>
  );
}
