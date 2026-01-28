import { useState } from "react";
import "./App.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
            <label>UserName:</label>
            <input
            type="text"
            placeholder="Enter user name"
            name="username"
            value={formData.username}
            onChange={handleChange}
        />
        </div>

        <br />
        <div>
            <label>Email:</label>
            <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            />
        </div>
        <br />
        <div>
            <label>Password:</label>
            <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            />
        </div>

        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Register;
