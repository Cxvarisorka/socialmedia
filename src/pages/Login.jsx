import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        };

        e.target.reset();
        login(data);
    }

    return (
        <section className="page-section">
            <h2 className="page-title">Login</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input className="form-input" type="email" name="email" placeholder="Email" required />
                <input className="form-input" type="password" name="password" placeholder="Password" required />

                <button className="btn btn-primary">Submit</button>
            </form>
        </section>
    )
};

export default Login;
