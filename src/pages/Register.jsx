import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";



export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();


  // Load google script w/ useEffect
    useEffect(() => {
    const script = document.createElement("script"); // create script element

    // define script attributes
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    // add script to DOM
    document.body.appendChild(script);

    // load script
    script.onload = () => {
      try {
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
        });

        google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        );
      } catch (err) {
        console.error("Google sign-in initialization failed:", err);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);



    // Keep async functions within register uses React component navigate
    // When register form is submitted
    async function onSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch(BACKEND_URL + "/api/user/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password: pass, email }),
            });

            if (!res.ok) {
                throw new Error("HTTP " + res.status);
            }
            
            console.log("res:", await res.clone().json());
            const { jwtToken, refreshToken } = await res.json();
        
            localStorage.setItem("registeredUser", username);
            localStorage.setItem('loginUserJWTToken', jwtToken);

            if (refreshToken) {
              localStorage.setItem('refreshToken', refreshToken);
            }

            navigate("/");
        } 
        catch (err) {
            if (err.message.startsWith("HTTP")) alert(`Registration failed: ${err.message}`);
            else{
                alert("Network error");
            }
        }
    }

// handgle google cred response
    async function handleGoogleCredentialResponse(response) {
        const idToken = response.credential;
        
        // Save webtoken in backend authenticated user session
        try {
            const res = await fetch(BACKEND_URL + "/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: idToken }),
            });

            if (!res.ok) throw new Error("HTTP " + res.status);
            const data = await res.json();

            localStorage.setItem("app_jwt", data.jwt);
            navigate("/dashboard");
        } 
        catch (err) {
            console.error("Google sign-in failed:", err);
            alert("Google sign-in failed.");
        }
    }





  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 300, margin: "auto" }}>
      <h2>Register</h2>

      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />

      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <input placeholder="Password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />

      <button type="submit" style={{ marginTop: "10px" }}>
        Sign Up
      </button>

      <hr />
      <div id="googleSignInDiv" style={{ marginTop: "10px" }}></div>
    </form>
  );
}
