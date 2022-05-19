import React, { useState, useEffect } from "react";
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
	const [currentUserData, setCurrentUserData] = useState({});
	const [newsletters, setNewsLetters] = useState(null);

	function handleOnChange(name) {
		const { value } = name.target;
		let object = { ...newsletters };
		object[value] = !object[value];
		setNewsLetters(object);
	}

	function submitPreferences() {
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
			if (doc.data()) {
				setNewsLetters({
					TravelOpportunities: currentUserData.TravelOpportunities,
					SpaceOriginUpdates: currentUserData.SpaceOriginUpdates,
					CareerOpportunities: currentUserData.CareerOpportunities,
					Events: currentUserData.Events,
				});
				setCurrentUserData({ ...doc.data(), id: doc.id });
			} else setCurrentUserData(doc.data());
		});
	}

	useEffect(() => {
		if (email != null) {
			getEmailInfo();
		}
	}, []);

	return (
		<div>
			<div className={style.textContent}>
				<h2>
					Welcome back {currentUserData.firstName}{" "}
					{currentUserData.lastName}.
				</h2>
				<div>
					<p>You can customize the content you'd like to see here.</p>
				</div>
				<div>
					<h2>I Want To See...</h2>
				</div>
			</div>
			<div className={style.preferencesForm}>
				{newsletters != null &&
					Object.keys(newsletters).map((newsletter, index) => {
						return (
							<label key={index} className={style.checkBoxLabel}>
								<input
									type="checkbox"
									value={newsletter}
									checked={newsletters[newsletter]}
									onChange={(newsletter) =>
										handleOnChange(newsletter, index)
									}
								/>
								{newsletter}
							</label>
						);
					})}
				<button onClick={submitPreferences}>Submit Preferences</button>
			</div>
		</div>
	);
};

export default Preferences;
