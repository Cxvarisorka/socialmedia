export default function Home() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Welcome to Home</h1>
            <p>This is a simple home page.</p>
            <button onClick={() => alert('Button clicked!')}>Click Me</button>
        </div>
    );
}