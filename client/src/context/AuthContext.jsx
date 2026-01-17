import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

// Hook to use context value
export const useAuth = () => useContext(AuthContext);

// Constants
const API_URL = 'http://localhost:3000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if(!storedUser) return;

        setUser(storedUser);
        navigate('/profile');
    }, []);

    const register = async (user) => {
        try {
            const res = await fetch(API_URL + '/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await res.json();

            if(!res.ok) {
                alert(data.message);
                return;
            }

            alert(data.message);
            navigate('/login');
        } catch(err) {
            console.log(err);
        }
    };

    const login = async (user) => {
        try {
            const res = await fetch(API_URL + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await res.json();

            if(!res.ok) {
                alert(data.message);
                return;
            }

            localStorage.setItem('user', JSON.stringify(data));

            setUser(data);
            alert('Succesfully logged in!');
            navigate('/profile');
        } catch(err) {
            console.log(err);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{register, login, logout, user}}>
            { children }
        </AuthContext.Provider>
    )
}