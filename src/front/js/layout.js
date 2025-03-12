import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { ThemeProvider } from "./context/ThemeContext";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { LogIn } from "./pages/login";
import { SignUp } from "./pages/signup";
import { Profile } from "./pages/profile";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Meal from "./component/Meal";
import MealInfo from "./pages/MealInfo";
import FeaturedRecipes from "./component/FeaturedRecipes"
import WorkoutInfo from "./pages/WorkoutInfo";
import Workout from "./component/Workout";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL == "") return <BackendURL />;

    return (
        <ThemeProvider>
            <div id="app">
                <BrowserRouter basename={basename}>
                    <ScrollToTop>
                        <Navbar />
                        <main className="main">
                            <Routes>
                                <Route element={<Home />} path="/" />
                                <Route element={<MealInfo />} path="/meal/:MealId" />
                                <Route element={<WorkoutInfo />} path="/workout/:WorkoutID" />
                                <Route element={<Meal />} path="/meal" />
                                <Route element={<Workout />} path="/workout" />
                                <Route element={<LogIn />} path="/login" />
                                <Route element={<Profile />} path="/profile" />
                                <Route element={<SignUp />} path="/signup" />
                                <Route element={<h1>Not found!</h1>} />
                            </Routes>
                        </main>
                        <Footer />
                    </ScrollToTop>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
};

export default injectContext(Layout);
