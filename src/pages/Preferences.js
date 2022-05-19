import React, { useState, useEffect } from "react";
import style from "./Home.module.scss";
import { db } from "../firebase-config";
import {
	collection,
	doc,
	setDoc,
	addDoc,
	getDocs,
	Timestamp,
} from "firebase/firestore";

const Preferences = () => {
	const [formData, setFormData] = useState({
		newsletterTravel: "",
		newsletterUpdates: "",
		newsletterCareers: "",
		newsletterEvents: "",
		newsletterUnsubscribe: "",
	});

	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const {
		newsletterTravel,
		newsletterUpdates,
		newsletterCareers,
		newsletterEvents,
		newsletterUnsubscribe,
	} = formData;
	const [emailExists, setEmailExists] = useState(false);

	// const handleChangeOne = () => {
	// 	setCheckedOne(!checkedOne);
	// };

	// const handleChangeTwo = () => {
	// 	setCheckedTwo(!checkedTwo);
	// };

	async function postSubmit() {
		const usersRef = collection(db, "preferences");
		await addDoc(usersRef, {
			...formData,
			createdAt: Timestamp.fromDate(new Date()),
		});
	}

	// I am pretty sure this should be user_id and not email
	const handleSubmit = async (event) => {
		event.preventDefault();
		let checkEmail = await getEmailList();
		if (checkEmail.includes(formData.email)) {
			setIsFormSubmitted(true);
			postSubmit();
			// 	setFormData({
			// 		newsletterTravel: "",
			// 		newsletterUpdates: "",
			// 		newsletterCareers: "",
			// 		newsletterEvents: "",
			// 		newsletterUnsubscribe: "",
			// }
		}
	};

	async function getEmailList() {
		let emailList = [];
		const usersRef = collection(db, "users");
		const data = await getDocs(usersRef);
		data.docs.forEach((user) => emailList.push(user.data().email));
		return emailList;
	}

	const Checkbox = ({ label, value, onChange }) => {
		return (
			<label>
				<input type="checkbox" checked={value} onChange={onChange} />
				{label}
			</label>
		);
	};

	return (
		<div className={style.preferencesContainer}>
			<Checkbox
				label="Commercial Space Travel Opportunities"
				value={newsletterTravel}
				onChange={handleSubmit}
			/>
			<br />
			<Checkbox
				label="Space Origin Updates"
				value={newsletterUpdates}
				onChange={handleSubmit}
			/>
			<br />
			<Checkbox
				label="Career Opportunities"
				value={newsletterCareers}
				onChange={handleSubmit}
			/>
			<br />
			<Checkbox
				label="Events"
				value={newsletterEvents}
				onChange={handleSubmit}
			/>
			<br />
			<Checkbox
				label="Unsubscribe"
				value={newsletterUnsubscribe}
				onChange={handleSubmit}
			/>
			<br />
		</div>
	);
};

export default Preferences;
