import React from "react";
import style from "../pages/Home.module.scss";
import { GoRocket } from "react-icons/fa";
import { AiTwotoneRocket } from "react-icons/ai";
import spaceShip from "../images/spaceship.png";

function LandingPage() {
	return (
		<div className={style.imgContainer}>
			<h1 className={style.companyName}>Space Origin</h1>
			<img
				src={spaceShip}
				alt="space x ship on the moon"
				className={style.landingImg}
			/>
		</div>
	);
}

export default LandingPage;
