import React from "react";

export const Carousel = () => {
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940&auto=format&fit=crop",
            title: "Transform Your Life",
            description: "Start your fitness journey today with personalized workouts"
        },
        {
            image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=2940&auto=format&fit=crop",
            title: "Eat Better, Feel Better",
            description: "Discover nutritious and delicious recipes"
        },
        {
            image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2940&auto=format&fit=crop",
            title: "Train Smarter",
            description: "Access expert-designed workout plans"
        }
    ];

    return (
        <div className="hero-carousel">
            <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {slides.map((slide, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <div className="carousel-image-wrapper">
                                <img
                                    src={slide.image}
                                    className="carousel-img"
                                    alt={slide.title}
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                            </div>
                            <div className="carousel-content">
                                <div className="carousel-text-content">
                                    <h1>{slide.title}</h1>
                                    <p>{slide.description}</p>
                                    <button className="carousel-cta">Get Started</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="carousel-controls">
                    <button
                        className="carousel-control carousel-control-prev"
                        type="button"
                        data-bs-target="#heroCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-icon" aria-hidden="true">
                            <i className="fas fa-chevron-left"></i>
                        </span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control carousel-control-next"
                        type="button"
                        data-bs-target="#heroCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-icon" aria-hidden="true">
                            <i className="fas fa-chevron-right"></i>
                        </span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <div className="carousel-indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#heroCarousel"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};