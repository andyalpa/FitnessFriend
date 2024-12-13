import React, { useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { UpdateUserModal } from "../component/updateUserModal";
import UploadImage from "../component/uploadImage";
import { LoginModal } from "../component/loginmodal";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [user, setUser] = useState({});
  const { store, actions } = useContext(Context);
  const [weightHistory, setWeightHistory] = useState([]);
  const [newWeight, setNewWeight] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const getUser = async () => {
    await actions.getUser();
  };

  const getWeightHistory = async () => {
    let response = await fetch(process.env.BACKEND_URL + "/userMetrics", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      let data = await response.json();
      console.log("Fetched weight history:", data);
      setWeightHistory(data); // Set the weight history data
    } else {
      console.error("Failed to fetch weight history:", await response.text());
    }
  };

  const addNewWeight = async () => {
    let response = await fetch(process.env.BACKEND_URL + "/userMetrics", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weight: parseFloat(newWeight) }),
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

  useEffect(() => {
    if (store.user) {
      setUser(store.user); // Make sure the data is being set correctly
      setEmail(store.user.email);
      setHeight(store.user.height);
      setNewWeight(store.user.weight);
      setLastName(store.user.last_name);
      setName(store.user.name);
    }
  }, [store.user]);

  useEffect(() => {
    if (!store.token) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [store.token, navigate]);

  return (
    <div className="mt-5">
      {store.token ? (
        <div className="container text-center  profile-layout">
          <div className="row">
            {/* top left User Info */}
            <div className="col-md-6">
              <div className="bg-white p-0 px-3 py-3 mb-3">
                <div className="d-flex flex-column align-items-center">
                  <UploadImage user={user} />
                  <p className="fw-bold h4 mt-3">
                    {name} {lastName}
                  </p>
                  <p className="text-muted">{email}</p>
                  <div className="d-flex ">
                    <div className="btn btn-primary follow me-2">Follow</div>
                    <div className="btn-outline-primary message">
                      <UpdateUserModal />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* top right Basic Details */}
            <div className="col-md-6 ">
              <div className="bg-white px-3 mb-3 pb-3 basic-details">
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="py-2">Full Name</p>
                  <p className="py-2 text-muted">
                    {name} {lastName}
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="py-2">Email</p>
                  <p className="py-2 text-muted">{email}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="py-2">Height</p>
                  <p className="py-2 text-muted">{height} cm</p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="py-2">Weight</p>
                  <p className="py-2 text-muted">{newWeight} kg</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
          {/* Bottm Left - Social Links */}
          <div className="col-md-6">
      <div className="bg-white p-0 px-2 pb-3 mb-3">
        <div className="d-flex justify-content-between border-bottom py-2 px-3">
          <p><span className="fas fa-globe me-2"></span>Website</p>
          <a href="#"></a>
        </div>
        <div className="d-flex justify-content-between border-bottom py-2 px-3">
          <p><span className="fab fa-github-alt me-2"></span>Github</p>
          <a href=""></a>
        </div>
        <div className="d-flex justify-content-between border-bottom py-2 px-3">
          <p><span className="fab fa-twitter me-2"></span>Twitter</p>
          <a href=""></a>
        </div>
        <div className="d-flex justify-content-between border-bottom py-2 px-3">
          <p><span className="fab fa-instagram me-2"></span>Instagram</p>
          <a href=""></a>
        </div>
        <div className="d-flex justify-content-between py-2 px-3">
          <p><span className="fab fa-facebook-f me-2"></span>Facebook</p>
          <a href=""></a>
        </div>
      </div>
    </div> 

    {/* Bottom Right Weight Tracker */}
    <div className="col-md-6">
      <div className="bg-white p-0 px-2 pb-3 mb-3">
        <h2>Weight Tracker</h2>
        <input
          type="number"
          placeholder="Enter new weight"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
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
                <strong>{new Date(entry.created_at).toLocaleDateString()}</strong>
                : {entry.weight} kg
              </li>
                ))
              ) : (
                <li className="list-group-item">No weight history found.</li>
              )}
            </ul>
          </div>
        </div>
        </div>
        </div>
        
      ) : (
        <div style={{ paddingTop: "240px" }}>
          <div className="alert alert-light">
            <div className="text-center" role="alert">
              You must log in to see your profile{" "}
              <a href="#" className="alert-link">
                <LoginModal />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};
