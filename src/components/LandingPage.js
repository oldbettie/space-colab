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
			<div className={style.textContent}>
				<h2>JOIN OUR NEWSLETTER</h2>
				<p>
					Subscribe to our newsletter to get to know us better and be
					with us in every adventure.
				</p>
				<p>
					By signing up, you will receive monthly updates on
					everything happening in our organisation
				</p>
			</div>
		</div>
	);
}

export default LandingPage;
