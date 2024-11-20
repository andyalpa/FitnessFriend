import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<Link to={"/signup"} className="btn btn-primary mx-2" >Sign Up</Link>
			<Link to={"/login"} className="btn btn-primary mx-2" >log In</Link>
			<Link to={"/profile"} className="btn btn-primary mx-2" >Profile</Link>
		</div>
	);
};
