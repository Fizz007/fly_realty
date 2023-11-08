import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../utils/Baseurl";

const Create = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    comments: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user);

    const response = await fetch(`${baseurl}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      console.log(result);
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address: "",
        comments: "",
        gender: "",
      });
      setError("");
      navigate("/read");
    }
  };

  return (
    <div className="container my-2">
      <h1 className="h1 text-center">Fill the data</h1>
      {error && <div className="alert alert-danger"> {error} </div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            minLength="4"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            minLength="4"
            
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
            
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input
            type="text"
            className="form-control"
            name="mobile"
            value={user.mobile}
            onChange={handleChange}
            
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={user.address}
            onChange={handleChange}
            
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Comments</label>
          <textarea
            className="form-control"
            name="comments"
            value={user.comments}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            name="gender"
            value={user.gender}
            onChange={handleChange}
            
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
