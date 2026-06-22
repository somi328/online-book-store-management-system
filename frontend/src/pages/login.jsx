import { useState } from "react";
import axios from "axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = () => {

        const loginData = {
            email: email,
            password: password
        };

        axios.post("http://localhost:8080/login", loginData)
            .then((response) => {

                alert("Login Successful");

                localStorage.setItem("isLoggedIn", "true");

                setEmail("");
                setPassword("");

                window.location.href = "/books";

            })
            .catch((error) => {

                alert("Invalid Email or Password");

                console.log(error);

            });
    };

    return (

        <div
            style={{
                textAlign: "center",
                marginTop: "100px"
            }}
        >

            <h1>Login Page</h1>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={loginUser}>
                Login
            </button>

            <br /><br />

            <a href="/register">
                New User? Register Here
            </a>

        </div>

    );
}

export default Login;