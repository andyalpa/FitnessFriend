import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const UpdateUserModal = () => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({
    email: "",
    height: "",
    name: "",
    last_name: "",
    weight: "",
    pic: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update user profile
  const handleUpdateUser = async () => {
    const updatedFormData = { ...formData };
    const result = await actions.updateUser(updatedFormData);

    if (result.success) {
      alert(result.message); // Show success message
      const modal = new bootstrap.Modal(
        document.getElementById("updateUserModal")
      );
      modal.hide(); // Hide the modal on success
    } else {
      alert(result.message); // Show error message
    }
  };

  useEffect(() => {
    if (store.user) {
      console.log("Updated store user:", store.user);

      setFormData({
        email: store.user.email,
        height: store.user.height,
        name: store.user.name,
        last_name: store.user.last_name,
        weight: store.user.weight,
      });
    } else {
      actions.getUser();
    }
  }, [store.user]);

  return (
    <div>
      <button
        style={{ backgroundColor: "#006A4E", border: "none", color: "white" }}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#updateUserModal"
      >
        Update Profile
      </button>

      <div
        className="modal fade"
        id="updateUserModal"
        tabIndex="-1"
        aria-labelledby="updateUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <img
                className="img-fluid"
                alt="Responsive image"
                src="https://i.imgur.com/sB3VJu2.png"
                style={{ width: "105px", marginLeft: "177px" }}
              />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    name="height"
                    placeholder="Height (cm)"
                    value={formData.height}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                style={{
                  backgroundColor: "#006A4E",
                  border: "none",
                  color: "white",
                }}
                className="btn "
                onClick={handleUpdateUser}
                data-bs-dismiss="modal"
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
