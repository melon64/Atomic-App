import "../Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


function MyNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light nav">
      <div className="blockone">
        <div className="circle"><FontAwesomeIcon icon={faCoffee}/></div>
        <Link className="link" to="/goals">
          View All Goals
        </Link>
        <Link className="link" to="/user">
          Dashboard
        </Link>
        <Link className="link" to="/user/calendar">
          Calendar
        </Link>
      </div>
      <div className="blocktwo">
        <Link className="link" to="/">
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default MyNavbar;