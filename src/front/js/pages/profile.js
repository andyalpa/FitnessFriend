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
		let data = await response.json()
		setUser(data)
	}
	
	useEffect(() => {
		getUser()
	}, [])

	const getWeightHistory = async () => {
        let response = await fetch(process.env.BACKEND_URL + "/userMetrics", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${store.token}`,
                "Content-Type": "application/json"
            }
        });
        let data = await response.json();
        setWeightHistory(data);
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
        }
    };

    useEffect(() => {
        getUser();
        getWeightHistory();
    }, []);

	return (
		
		<div className="text-center mt-5">
            {user.email ? (
                <div>
                    <h1>Welcome Back!</h1>
                    <h3>Email: {user.email}</h3>
                    <h4>Name: {user.name} {user.last_name}</h4>
                    <h4>Height: {user.height} cm</h4>
                    <h4>Weight: {user.weight} kg</h4>
                </div>
            ) : (
                <h1>YOU MUST LOGIN</h1>
            )}
        </div>
	);
};
