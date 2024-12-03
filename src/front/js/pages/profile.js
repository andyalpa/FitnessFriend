import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";


export const Profile = () => {
	const [user, setUser] = useState({})
	const { store, actions } = useContext(Context);
	const [weightHistory, setWeightHistory] = useState([]);
    const [newWeight, setNewWeight] = useState("");
	
	const getUser = async() => {
		console.log(store.token)
		let response = await fetch(process.env.BACKEND_URL + "/user" , {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${store.token}`, 
				"Content-Type": "application/json"
			}
		})

    if (response.ok) {
        let data = await response.json();
        console.log("Fetched user data:", data);  // Check the fetched data here
        setUser(data);  // Make sure the data is being set correctly
    } else {
        console.error("Failed to fetch user data:", response.status);
    }
};
	
	

	const getWeightHistory = async () => {
        let response = await fetch(process.env.BACKEND_URL + "/userMetrics", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${store.token}`,
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            let data = await response.json();
            console.log("Fetched weight history:", data);
            setWeightHistory(data);  // Set the weight history data
        } else {
            console.error("Failed to fetch weight history:", await response.text());
        }
    };

    const addNewWeight = async () => {
        let response = await fetch(process.env.BACKEND_URL + "/userMetrics", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${store.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ weight: parseFloat(newWeight) })
        });
        if (response.ok) {
            setNewWeight("");
            getWeightHistory(); // Refresh weight history after adding new weight
        } else {
            console.error("Failed to add new weight:", response.status);
        }
    };
    useEffect(() => {
        if (store.token) {
            getUser();
            getWeightHistory();
        }
    }, [store.token]);
  
    
    
	return (
       
		<div className="mt-5">
            {store.token ? (
                
                <div className="container text-center  profile-layout ">
                    
                    <div className="profile-content my-auto">
                        <h1 className="profile-title">Hello, {user.name}</h1>
                        <h3>Email: {user.email}</h3>
                        <h4>Name: {user.name} {user.last_name}</h4>
                        <h4>Height: {user.height} cm</h4>
                        <h4>Weight: {user.weight} kg</h4>
                    </div>
                <div className="container">
                    <h2>Weight Tracker</h2>
                    <input
                        type="number"
                        placeholder="Enter new weight"
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)} // Update state with the new weight
                        className="form-control"
                    />
                    <button
                        onClick={addNewWeight}
                        className="btn btn-primary mt-2"
                        disabled={!newWeight || isNaN(newWeight)}
                    >
                        Add Weight
                    </button>

                    <h3>Weight History</h3>
                    <ul className="list-group mx-auto mt-3">
                        {weightHistory.length > 0 ? (
                            weightHistory.map((entry) => (
                                <li key={entry.id} className="list-group-item">
                                    <strong>{new Date(entry.created_at).toLocaleDateString()}</strong>: {entry.weight} kg
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item">No weight history found.</li>
                        )}
                        
                    </ul>
                </div>
            </div>
            ) : (
                <h1>You must log in to view your profile</h1>
            )}
           </div>
        
	);
};