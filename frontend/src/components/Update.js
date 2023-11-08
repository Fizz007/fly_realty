import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../utils/Baseurl";

const Update = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    comments: "",
    gender: "",
  });

  const [error, setError] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  // Receiving single user data
  const getSingleData = async () => {
    const response = await fetch(`${baseurl}/api/users/${id}`);
    const result = await response.json();

    if (response.ok) {
      setUser({
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        mobile: result.mobile,
        address: result.address,
        comments: result.comments,
        gender: result.gender,
      });
    }
  };

  // Passing edited data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseurl}/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Updated result:", result);
      setError("");
      navigate("/read");
    } else {
      console.log(result.error);
      setError(result.error);
    }
  };

  useEffect(() => {
    getSingleData();
  }, [id]);

  return (
    <div className="container my-2">
      <h1 className="h1 text-center">Edit Data</h1>
      {error && <div className="alert alert-danger"> {error} </div>}
      <form className="form" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
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
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            minLength="4"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input
            type="text"
            className="form-control"
            name="mobile"
            value={user.mobile}
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Comments</label>
          <textarea
            className="form-control"
            name="comments"
            value={user.comments}
            onChange={(e) => setUser({ ...user, comments: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            name="gender"
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-info">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
