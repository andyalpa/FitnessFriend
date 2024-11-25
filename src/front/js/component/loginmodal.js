import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

export const LoginModal = () => {
    const [signupView, setSignupView] = useState(false);

    return (
        <div>
            <button
                type="button"
                className="button modal-btn"
                style={{ maxHeight: "47px" }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Login
            </button>

            <div
                className="modal fade modal-dialog modal-lg"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {signupView ? "Sign Up" : "Welcome! Please sign up or Login to your account here:"}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {signupView ? "SIGN UP HERE" : "....."}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setSignupView(!signupView)}
                            >
                                {signupView ? "Go to Login" : "Create Account"}
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
