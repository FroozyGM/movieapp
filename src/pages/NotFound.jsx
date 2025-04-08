import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="container"
      style={{ textAlign: "center", padding: "60px 0" }}
    >
      <h1 className="page-title">404 - Page Not Found</h1>
      <p style={{ marginBottom: "20px" }}>
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="button">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
