import React, { useState, useEffect } from "react";
import style from "./Home.module.scss";
import Subscribe from "../components/Subscribe";
import LandingPage from "../components/LandingPage";
import Preferences from "./Preferences";

function Home() {
	// preferances will be its own page eventually
	const [prefBtn, setPrefBtn] = useState(false);
	const [storageEmail, setStorageEmail] = useState(null);

	function checkForEmail() {
		const email = localStorage.getItem("spaceOriginsEmail");
		if (email) {
			setStorageEmail(JSON.parse(email));
		}
	}

	setTimeout(() => {
		checkForEmail();
	}, 400);

	return (
		<div>
			<main>
				<LandingPage />
				{storageEmail != null ? (
					<div>
						<Preferences email={storageEmail} />
					</div>
				) : (
					<Subscribe />
				)}
				{/* {btn && <Preferences />} */}
				{/* <button>Edit Preferences</button> */}
			</main>
			<footer>
				<div className={style.lowerCompany}>
					<h3>Space Origin</h3>
				</div>
				<div className={style.links}>
					<a href="#">Linked In</a>
					<a href="#">Twitter</a>
					<a href="#">Facebook</a>
					<a href="#">Email</a>
					<a href="#">Flicker</a>
					<a href="#">Privacy Policy</a>
					<a href="#">Supplies</a>
				</div>
			</footer>
		</div>
	);
}

export default Home;
