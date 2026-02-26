import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
    const [verifyCode, SetVerifyCode] = useState('');

    const { isReg, verifyEmail, signup } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        };

        signup(data);
    };

    const handleClick = () => {
        if(verifyCode.length !== 4) return;
        verifyEmail(parseInt(verifyCode));
    }

    return (
        <div>
            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>
                {
                    isReg ? (
                        <>
                            <input type="text" value={verifyCode} onChange={({target}) => SetVerifyCode(target.value)} name="code" placeholder="Enter code" required />
                            <button type="button" onClick={handleClick}>Verify</button>
                        </>
                    ) : (
                        <>
                            <input type="text" name="name" placeholder="Name" required />
                            <input type="email" name="email" placeholder="Email" required />
                            <input type="password" name="password" placeholder="Pass" required />
                            <button type="submit">Submit</button>
                        </>
                    )
                }
            </form>
        </div>
    )
};

export default Signup;