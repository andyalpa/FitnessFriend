import React from "react";


export const Carousel = () => {
    return (


        <div id="pics" className="carousel slide w-50  h-50 mx-auto" data-bs-ride="carousel" data-bs-interval="2000">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img height="200px" width="200px"src="https://trello.com/1/cards/6737db7c2a103058f98d1dec/attachments/6737dec7195305efcfb37d28/previews/6737decc195305efcfb37d33/download/grooveland-designs-fhuPrCwAzaw-unsplash.webp" className="d-block w-100" alt="Slide 1" />
                </div>
                <div className="carousel-item">
                    <img src="https://trello.com/1/cards/6737db7c2a103058f98d1dec/attachments/6737dbfc85f4c7493fe9331a/previews/6737dc0485f4c7493fe947ac/download/melissa-belanger-7YLe87dcrm8-unsplash_%281%29.webp" className="d-block w-100" alt="Slide 2" />
                </div>
                <div className="carousel-item">
                    <img src="https://trello.com/1/cards/6737db7c2a103058f98d1dec/attachments/6737dd75459b029f544a4ec2/previews/6737dd7b459b029f544a5133/download/ella-olsson-lMcRyBx4G50-unsplash.webp" className="d-block w-100" alt="Slide 3" />
                </div>
                <div className="carousel-item">
                    <img src="https://trello.com/1/cards/6737db7c2a103058f98d1dec/attachments/6737df25b7e48c914fdf1b17/previews/6737df2bb7e48c914fdf23ef/download/caroline-attwood-yzFO7e_87fs-unsplash.webp" className="d-block w-100" alt="Slide 4" />
                </div>
                <div className="carousel-item">
                    <img src="https://trello.com/1/cards/6737db7c2a103058f98d1dec/attachments/6737dd518155bce7f31244ae/previews/6737dd548155bce7f3124daf/download/wesual-click-HK4n3W95F2c-unsplash.webp" className="d-block w-100" alt="Slide 5" />
                </div>
                <div className="carousel-item">
                    <img src="" className="d-block w-100" alt="Slide 6" />
                </div>
                <div className="carousel-item">
                    <img src="https://trello.com/1/cards/6737db7c2a103058f98d1dec/attachments/6737dd75459b029f544a4ec2/previews/6737dd7b459b029f544a5133/download/ella-olsson-lMcRyBx4G50-unsplash.webp" className="d-block w-100" alt="Slide 7" />
                </div>
                <div className="carousel-item">
                    <img src="https://trello.com/1/cards/6737db7c2a103058f98d1dec/attachments/6737dd75459b029f544a4ec2/previews/6737dd7b459b029f544a5133/download/ella-olsson-lMcRyBx4G50-unsplash.webp" className="d-block w-100" alt="Slide 8" />
                </div>
                <div className="carousel-item">
                    <img src="https://trello.com/1/cards/6737db7c2a103058f98d1dec/attachments/6737dd75459b029f544a4ec2/previews/6737dd7b459b029f544a5133/download/ella-olsson-lMcRyBx4G50-unsplash.webp" className="d-block w-100" alt="Slide 8" />
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
