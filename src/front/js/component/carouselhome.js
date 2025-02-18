import React from "react";

export const Carousel = () => {
    return (
        <div id="carouselHero" className="carousel slide w-50 h-50 mx-auto" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://i.imgur.com/3uDXlnP.png" className="d-block w-100 carousel-image" alt="Slide 1" />
                </div>
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/7937049/pexels-photo-7937049.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100 carousel-image" alt="Slide 2" />
                </div>
                <div className="carousel-item">
                    <img src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 carousel-image" alt="Slide 3" />
                </div>
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/7991936/pexels-photo-7991936.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100 carousel-image" alt="Slide 4" />
                </div>
                <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2428&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 carousel-image" alt="Slide 5" />
                </div>
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100 carousel-image" alt="Slide 6" />
                </div>
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/7031705/pexels-photo-7031705.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100 carousel-image" alt="Slide 7" />
                </div>
                <div className="carousel-item">
                    <img src="https://stewarthunter.armymwr.com/application/files/3215/4143/4442/FSHAAF_Fitness_EWb.jpg" className="d-block w-100 carousel-image" alt="Slide 8" />
                </div>
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100 carousel-image" alt="Slide 8" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};