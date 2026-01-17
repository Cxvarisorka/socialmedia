import { useAuth } from "../context/AuthContext";

const Register = () => {
    const { register } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        };

        e.target.reset();
        register(data);
    }

    return (
        <section className="page-section">
            <h2 className="page-title">Register</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input className="form-input" type="text" name="username" placeholder="Username" required />
                <input className="form-input" type="email" name="email" placeholder="Email" required />
                <input className="form-input" type="password" name="password" placeholder="Password" required />

                <button className="btn btn-primary">Submit</button>
            </form>
        </section>
    )
};

export default Register;
