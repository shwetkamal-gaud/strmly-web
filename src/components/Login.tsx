import { useState } from 'react'
import { useGlobal } from '../context/GlobalContex';

const Login = () => {
    const [username, setUsername] = useState("");
    const { login } = useGlobal();

    const handleLogin = () => {
        if (username.trim()) {
            login(username);
        }
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-black text-white px-4">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-600 mb-4 w-full max-w-xs"
            />
            <button
                onClick={handleLogin}
                className="bg-white text-black px-4 py-2 rounded font-medium"
            >
                Login
            </button>
        </div>
    );
}

export default Login