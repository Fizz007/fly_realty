import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:6400/api/users/${id}`, {
        method: "DELETE",
      });
  
      const result1 = await response.json();
  
      if (!response.ok) {
        console.log(result1);
        setError(result1.error);
      } else if(response.ok) {
        console.log("deleted", response.ok);
        setError("Deleted Successfully");
        setError("");
          getData();
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  async function getData() {
    try {
      const response = await fetch('http://localhost:6400/api/users');
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setData(result);
        setError('');
      }
    } catch (error) {
      setError('Error fetching data');
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {data?.user && data?.user.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="card-text">{ele.age}</p>
                <span className="card-link cursor-pointer">
                  <Link to={`/${ele._id}`}>Edit</Link>
                  
                  </span>
                <span className="card-link cursor-pointer"  onClick={() => handleDelete(ele._id)}>
                <Link>Delete</Link>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
