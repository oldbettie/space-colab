import React from "react";
import style from "./Home.module.scss";
import Subscribe from "../components/Subscribe";
import LandingPage from "../components/LandingPage";
import Preferences from "./Preferences";

function Home() {
	// preferances will be its own page eventually
	return (
		<div>
			<main>
				<LandingPage />
				<Preferences />
				<Subscribe />
			</main>
			<footer></footer>
		</div>
	);
}

export default Home;
