import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/public/SingIn/singin"
import HomePage from "../pages/public/HomePage/home"
import SingUpPage from "../pages/public/SingUp/singup";
import SetLoginPage from "../pages/secure/SetLoginPage/setLogin";
import InfoPage from "../pages/secure/infoPage/infoPage"
import HomeSecurePage from "../pages/secure/HomeSecurePage/HomeSecurePage";

import PrivateRoute from "./routeWrapper";

export default function Routers() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/singup" element={<SingUpPage />} />
                    <Route element= {<PrivateRoute />}>
                        <Route path="/set" element={<SetLoginPage/>} />
                        <Route path="/info" element={<InfoPage/>} />
                        <Route path="/home" element={<HomeSecurePage/>} />
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}