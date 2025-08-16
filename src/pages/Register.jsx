import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch(BACKEND_URL + "/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password: pass, email })
            });
            if (!res.ok) { throw new Error(); }
            navigate("/login");
        }
        catch (err) {
            if (err.message.startsWith("HTTP")){
                alert(`Registration failed: ${err.message}`);
            }
            else if (err instanceof TypeError){
                alert('Network error');
            }
            else {
                alert('Unexpected error');
            }
        }
    }

    return (
        <form onSubmit={onSubmit} style={{ maxWidth: 300, margin: "auto" }}>
            <h2>Register</h2>
            <input placeholder="Username" value={username}
            onChange={e => setUsername(e.target.value)} required />

            <input placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required />

            <input placeholder="Password" type="password" value={pass}
            onChange={e => setPass(e.target.value)} required />

            <button type="submit">Sign Up</button>
        </form>
    );
}

