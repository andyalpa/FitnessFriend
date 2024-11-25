import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";

export const SignUp = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        last_name: "",
        height: "",
        weight: ""
    })
	const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const createUser = async(e) => {
        e.preventDefault()
        let response = await fetch(process.env.BACKEND_URL + "/signup", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formData)
        })
        if (response.ok) {
            alert("User created successfully!");
        } else {
            alert("Error creating user.");
        }
        let data = await response.json()
        
        // navigate("/")
    }

	return (
		// <div className="text-center mt-5">
        //     <div className="input-group mb-3">
        //         <span 
        //             className="input-group-text" 
        //             id="inputGroup-sizing-default"
        //         >    Email
        //         </span>
        //         <input 
        //             onChange={(e) => setEmail(e.target.value)} 
        //             type="text" className="form-control" 
        //             aria-label="Sizing example input" 
        //             aria-describedby="inputGroup-sizing-default"
        //         />
        //     </div>
        //     <div className="input-group mb-3">
        //         <span 
        //             className="input-group-text" 
        //             id="inputGroup-sizing-default"
        //         >   Password
        //         </span>
        //         <input 
        //             onChange={(e) => setPassword(e.target.value)}
        //             type="password" 
        //             className="form-control" 
        //             aria-label="Sizing example input" 
        //             aria-describedby="inputGroup-sizing-default"
        //         />
        //     </div>
        //     <button className="btn btn-info" onClick={() => createUser()}>Sign Up</button>
		// </div>
        <form onSubmit={createUser} className="container mt-4">
        <div className="row mb-3">
            <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-6">
                <label htmlFor="height" className="form-label">Height (cm)</label>
                <input
                    type="number"
                    className="form-control"
                    id="height"
                    name="height"
                    placeholder="Height (cm)"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="weight" className="form-label">Weight (kg)</label>
                <input
                    type="number"
                    className="form-control"
                    id="weight"
                    name="weight"
                    placeholder="Weight (kg)"
                    onChange={handleChange}
                    required
                />
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
            />
        </div>
        <button type="submit" className="btn btn-primary w-100"  >Sign Up</button>
    </form>
	);
};
