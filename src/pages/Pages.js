import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Preferences from "./Preferences";

function Pages() {
	const location = useLocation();
	return (
		<Routes location={location} key={location.pathname}>
			<Route path="/" element={<Home />} />
			<Route path="/edit/:id" element={<Preferences />} />
		</Routes>
	);
}

export default Pages;
