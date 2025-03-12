import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { UpdateUserModal } from "../component/updateUserModal";
import UploadImage from "../component/uploadImage";
import { LoginModal } from "../component/loginmodal";
import SocialLinkModal from "../component/socialLinkModal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { FoodTracker } from "../component/FoodTracker";


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
  const [selectedFavs, setSelectedFavs] = useState([]);

  // Social Media Links  
  const [socialLinks, setSocialLinks] = useState({
    website: "",
    github: "",
    twitter: "",
    instagram: "",
    facebook: "",
  });

  // Modal State  
  const [modalState, setModalState] = useState({
    show: false,
    currentTitle: "",
    currentLink: "",
    field: "",
  });

  const openModal = (title, currentLink, field) => {
    setModalState({
      show: true,
      currentTitle: title,
      currentLink: currentLink,
      field: field,
    });
  };

  const closeModal = () => {
    setModalState({ ...modalState, show: false });
  };

  const saveLink = (newLink) => {
    setSocialLinks({
      ...socialLinks,
      [modalState.field]: newLink,
    });
  };

  const getUser = async () => {
    await actions.getUser();
  };

  const getWeightHistory = async () => {
    let response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/userMetrics", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      let data = await response.json();
      setWeightHistory(data);
    } else {
      console.error("Failed to fetch weight history:", await response.text());
    }
  };

  const handleFavoriteSelection = (favId) => {
    setSelectedFavs((prevSelectedFavs) => {
      if (prevSelectedFavs.includes(favId)) {
        return prevSelectedFavs.filter((id) => id !== favId);
      } else {
        return [...prevSelectedFavs, favId];
      }
    });
  };



  const addNewWeight = async () => {
    let response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/userMetrics", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weight: parseFloat(newWeight) }),
    });
    if (response.ok) {
      setNewWeight(newWeight);
      getWeightHistory();
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
      setUser(store.user);
      setEmail(store.user.email);
      setHeight(store.user.height);
      setNewWeight(store.user.weight);
      setLastName(store.user.last_name);
      setName(store.user.name);
    }
  }, [store.user]);

  useEffect(() => {
    if (!store.token) {
      navigate("/");
    }
  }, [store.token, navigate]);

  return (
    <div className="main">
      {store.token ? (
        <div className="container py-5">
          <div className="row">
            {/* Left Column - User Info & Social Links */}
            <div className="col-md-6">
              <div
                data-aos="fade-in"
                className="card p-4 mb-4"
                style={{ borderRadius: "16px" }}
              >
                <div className="d-flex flex-column align-items-center">
                  <UploadImage />
                  <p className="fw-bold h4 mt-3">
                    {name} {lastName}
                  </p>
                  <p className="text-muted">{email}</p>
                  <div className="btn-outline-primary message">
                    <UpdateUserModal />
                  </div>
                </div>

                {/* Basic Details */}
                <div className="mt-3">
                  <div className="d-flex justify-content-between py-2">
                    <p className="mb-0">Height</p>
                    <p className="mb-0 text-muted">{height} cm</p>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <p className="mb-0">Weight</p>
                    <p className="mb-0 text-muted">{newWeight} kg</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div
                data-aos="fade-in"
                className="card p-4 mb-4"
                style={{ borderRadius: "16px", height: "289px" }}
              >
                <h5>Social Links</h5>
                {Object.entries(socialLinks).map(([field, link]) => (
                  <div
                    className="d-flex justify-content-between align-items-center py-2"
                    key={field}
                  >
                    <p className="mb-0 text-capitalize">{field}</p>
                    <a href={link} className="text-muted">
                      {link}
                    </a>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => openModal(field, link, field)}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Weight Tracker */}
            <div className="col-md-6">
              <div
                data-aos="fade-in"
                className="card p-4 mb-4"
                style={{ borderRadius: "16px" }}
              >
                <h2>Weight Tracker</h2>
                <input
                  type="number"
                  placeholder="Enter new weight"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="form-control mb-2"
                />
                <button
                  onClick={addNewWeight}
                  className="btn btn-primary mt-2"
                  disabled={!newWeight || isNaN(newWeight)}
                >
                  Add Weight
                </button>
                <h3 className="mt-4">Weight History</h3>
                <ul
                  className="list-group mx-auto mt-3"
                  style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  {weightHistory.length > 0 ? (
                    weightHistory.map((entry) => (
                      <li
                        key={entry.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <strong>
                          {new Date(entry.created_at).toLocaleDateString()}
                        </strong>
                        <span>{entry.weight} kg</span>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-center">
                      No weight history found.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <FoodTracker />
          </div>

          <div data-aos="fade-in" className="mt-5">
            <h2 data-aos="fade-in" className="home-header">Favorites</h2>
            <div className="recipes_grid">
              {store.favs.length > 0 ? (
                store.favs.map((fav, index) => (
                  <div data-aos="fade-in" key={index}>
                    <div
                      className="recipe_card"
                    >
                      <Link to={`/${fav.type}/${fav.id}`}>
                        <img src={fav.image} alt={fav.name} />
                      </Link>
                      <h3 className="meal-name">{fav.name}</h3>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-results">No favorites found</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="container text-center py-5">
          <div className="alert alert-light">
            <div role="alert">
              You must log in to see your profile{" "}
              <LoginModal />
            </div>
          </div>
        </div>
      )}

      {/* Social Link Modal */}
      <SocialLinkModal
        show={modalState.show}
        onClose={closeModal}
        onSave={saveLink}
        title={modalState.currentTitle}
        currentLink={modalState.currentLink}
      />
    </div>
  );
};