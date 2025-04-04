import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Header.css';
export function Header() {
  return (
    <>
      <div className="row colors">
        <Link to="/">
          <img src="/TherapyLogo.png" className="logo" alt="Therapy Logo" />
        </Link>
        <div className="nav-links">
          <Link to="/sign-in">
            <button className="my-butt">Sign In</button>
          </Link>
          <Link to="/userpage">
            <button className="my-butt">Home</button>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
