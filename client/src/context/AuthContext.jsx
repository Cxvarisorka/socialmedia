import { useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = 'http://localhost:3000/api'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isReg, setIsReg] = useState(false);
    const navigate = useNavigate();
    
    const signup = async data => {
        try {
            const res = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            }

            alert(result.message);
            setIsReg(true);
        } catch(err) {
            console.log(err.message)
        }
    };

    const login = async data => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            }

            console.log(result)

            alert("User login is succes!");
            setUser(result);
            navigate('/profile');
        } catch(err) {
            console.log(err.message)
        }
    };

    const verifyEmail = async code => {
        try {
            const res = await fetch(`${API_URL}/auth/verify`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({code})
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            }

            alert(result.message);
            setIsReg(false);
            navigate('/login');
        } catch(err) {
            console.log(err.message);
        }
    };

    return (
        <AuthContext.Provider value={{signup, verifyEmail, login, user, isReg}}>
            {children}
        </AuthContext.Provider>
    )
};