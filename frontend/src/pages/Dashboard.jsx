import { Link } from "react-router-dom";

function Dashboard() {
  return <div>Dashboard
    <br />

    <Link to="/register">Register link</Link>
    <Link to="/">Login link</Link>
  </div>;
}

export default Dashboard;
