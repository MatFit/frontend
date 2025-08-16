import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function Login() {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch(BACKEND_URL + "/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password: pass })
            });
            if (!res.ok) { throw new Error() }
            navigate("/home");
        } 
        catch { alert("Login failed"); }
    }

    console.log("test");
    console.log(BACKEND_URL);

    return (
        <form onSubmit={onSubmit} style={{ maxWidth: 300, margin: "auto" }}>
            <h2>Login</h2>
            <input placeholder="Username" value={username}
            onChange={e => setUsername(e.target.value)} required />
            <input placeholder="Password" type="password" value={pass}
            onChange={e => setPass(e.target.value)} required />
            <button type="submit">Log In</button>
        </form>
    );
}