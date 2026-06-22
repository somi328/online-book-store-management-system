import { useState } from "react";
import axios from "axios";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = () => {

        const user = {
            name,
            email,
            password
        };

        axios.post("http://localhost:8080/register", user)
            .then(() => {

                alert("Registration Successful");

                setName("");
                setEmail("");
                setPassword("");

                window.location.href = "/login";

            })
            .catch((error) => {

                alert("Registration Failed");

                console.log(error);

            });
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>

            <h1>Register Page</h1>

            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br /><br />

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

            <button onClick={registerUser}>
                Register
            </button>

        </div>
    );
}

export default Register;