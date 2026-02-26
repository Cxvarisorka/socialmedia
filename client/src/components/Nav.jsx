import { Link } from "react-router"
import { useAuth } from "../context/AuthContext";

const Nav = () => {
    const { user } = useAuth();

    return (
        <nav>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                { 
                    user ? (
                        <>
                            <li><Link to={'/products'}>Shop</Link></li>
                            <li><Link to={'/profile'}>Profile</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to={'/signup'}>Signup</Link></li>
                            <li><Link to={'/login'}>Login</Link></li>
                        </>
                    )
                }
                
            </ul>
        </nav>
    )
};

export default Nav;