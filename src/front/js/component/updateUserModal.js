import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const UpdateUserModal = () => {
  const [signupView, setSignupView] = useState(false);
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    last_name: "",
    height: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateUser = async () => {
    actions.updateUser({
      email: formData.email,
      height: formData.height,
      name: formData.name,
      last_name: formData.last_name,
    });
  };

  const update = async (e) => {
    e.preventDefault();
    let response = await fetch(process.env.BACKEND_URL + "/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("User updated successfully!");
    } else {
      alert("Error updating user.");
    }
    let data = await response.json();
  };

  useEffect(() => {
    console.log(store.user);
    if (store.user) {
      setFormData({
        email: store.user.email,
        height: store.user.height,
        name: store.user.name,
        last_name: user.last_name,
      }); // Make sure the data is being set correctly
    } else {
      actions.getUser();
      setFormData({
        email: store.user.email,
        height: store.user.height,
        name: store.user.name,
        last_name: user.last_name,
      });
    }
    console.log(formData);
  }, []);
  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Update Profile
      </button>

      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <img
                className="img-fluid"
                alt="Responsive image"
                src="https://i.imgur.com/sB3VJu2.png"
                style={{ width: "105px", marginLeft: "auto" }}
              />
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={update} className=" mx-auto">
                <div className=" mb-3">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label"></label>
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
                  <div className="mb-3">
                    <label htmlFor="last_name" className="form-label"></label>
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
                <div className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="height" className="form-label"></label>
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
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label"></label>
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                className=" btn btn-warning mt-3 rounded"
                onClick={() => updateUser()}
                style={{ width: "483px" }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
