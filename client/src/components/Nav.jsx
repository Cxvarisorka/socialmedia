import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
    const { user, logout } = useAuth();
    return (
        <header className="nav">
            <div className="nav-container">
                <h1 className="nav-logo">Social Media</h1>
                <ul className="nav-links">
                    <li className="nav-link"><Link to={'/'}>Home</Link></li>

                    {
                        user ?  (
                            <>
                                <li className="nav-link"><Link to={'/profile'}>Profile</Link></li>
                                <li className="nav-link"><Link to={'/feed'}>Feed</Link></li>
                                <li className="nav-link" onClick={logout}>Logout</li>
                            </>
                        ) : (
                            <>
                                <li className="nav-link"><Link to={'/register'}>Register</Link></li>
                                <li className="nav-link"><Link to={'/login'}>Login</Link></li>
                            </>
                        )
                    }
                </ul>
            </div>
        </header>
    )
};

export default Nav;
