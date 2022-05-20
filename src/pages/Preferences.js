import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.scss";
import { db } from "../firebase-config";
import {
	collection,
	query,
	doc,
	addDoc,
	getDocs,
	Timestamp,
	getDoc,
	where,
	updateDoc,
} from "firebase/firestore";

const Preferences = ({ email }) => {
	const navigate = useNavigate();
	const [currentUserData, setCurrentUserData] = useState({});
	const [newsletters, setNewsLetters] = useState(null);
	const [preBtn, setPreBtn] = useState(true);

	function handleOnChange(name) {
		const { value } = name.target;
		let object = { ...newsletters };
		object[value] = !object[value];
		setNewsLetters(object);
	}

	function submitPreferences() {
		setPreBtn(false);
		const userDoc = doc(db, "users", currentUserData.id);
		console.log(currentUserData.id);
		updateDoc(userDoc, {
			...currentUserData,
			...newsletters,
		});
	}

	// gets and sets user preferences if any are stored in db
	async function getEmailInfo() {
		const userInfo = collection(db, "users");
		const data = query(userInfo, where("email", "==", email));
		const userdata = await getDocs(data);
		userdata.docs.forEach((doc) => {
			console.log("object");
			if (doc.data() != null) {
				setNewsLetters({
					TravelOpportunities: doc.data().TravelOpportunities,
					SpaceOriginUpdates: doc.data().SpaceOriginUpdates,
					CareerOpportunities: doc.data().CareerOpportunities,
					Events: doc.data().Events,
				});
				setCurrentUserData({ ...doc.data(), id: doc.id });
			} else setCurrentUserData(doc.data());
		});
	}
	function changeBtn() {
		setPreBtn(!preBtn);
	}

	useEffect(() => {
		if (email != null) {
			getEmailInfo();
		}
	}, []);

	return (
		<div className={style.newsLetter}>
			<div className={style.textContentPreferences}>
				<h2>NEWSLETTER</h2>
				<div>
					<p>
						Subscribe to our newsletter to get to know us better and
						be with us in every adventure.
					</p>
					<p>
						By signing up, you will receive monthly updates on
						everything happening in our organisation
					</p>
				</div>
			</div>
			<div className={style.preferencesContainer}>
				<div className={style.textContent}>
					<h2>
						WELCOME {currentUserData.firstName}{" "}
						{currentUserData.lastName}!
					</h2>
					<p>You've subscribed to our newsletter</p>
					<p>You can customize the content you'd like to see here.</p>
				</div>
				{preBtn ? (
					<div className={style.preferencesForm}>
						<h3>I WANT TO SEE... </h3>
						{newsletters != null &&
							Object.keys(newsletters).map(
								(newsletter, index) => {
									return (
										<label
											key={index}
											className={style.checkBoxLabel}
										>
											<input
												type="checkbox"
												value={newsletter}
												checked={
													newsletters[newsletter]
												}
												onChange={(newsletter) =>
													handleOnChange(newsletter)
												}
											/>
											{newsletter}
										</label>
									);
								}
							)}
						<button onClick={submitPreferences}>
							SAVE PREFERENCES
						</button>
					</div>
				) : (
					<div className={style.preferencesForm}>
						<button onClick={changeBtn}>Edit Preferences</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Preferences;
