import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
	collection,
	doc,
	setDoc,
	addDoc,
	getDocs,
	Timestamp,
} from "firebase/firestore";
import style from "../pages/Home.module.scss";

const Subscribe = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState(null);
	const [formError, setFormError] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);

	function findNameError(name) {
		const invalidChars = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		if (invalidChars.test(name)) {
			return true;
		}
		return false;
	}

	function findEmailError(email) {
		if (email != null) {
			if (!email.includes("@") || !/^[^@]*@[^@]*$/.test(email)) {
				return true;
			}
		}
		return false;
	}

	const handleFirstNameInput = (event) => {
		setFirstName(event.target.value);
	};
	useEffect(() => {
		setFirstNameError(findNameError(firstName));
	}, [firstName]);

	const handleLastNameInput = (event) => {
		setLastName(event.target.value);
	};
	useEffect(() => {
		setLastNameError(findNameError(lastName));
	}, [lastName]);

	const handleEmailInput = (event) => {
		setEmail(event.target.value);
	};
	useEffect(() => {
		setEmailError(findEmailError(email));
	}, [email]);

	// get all emails for checking if email exists
	async function getEmailList() {
		let emailList = [];
		const usersRef = collection(db, "users");
		const data = await getDocs(usersRef);
		data.docs.forEach((user) => emailList.push(user.data().email));
		return emailList;
	}

	async function postSubmit() {
		const usersRef = collection(db, "users");
		await addDoc(usersRef, {
			firstName: firstName,
			lastName: lastName,
			email: email,
			createdAt: Timestamp.fromDate(new Date()),
		});
	}

	// handle new email signup
	const handleSubmit = async (event) => {
		event.preventDefault();
		let emailArr = await getEmailList();
		if (
			firstNameError ||
			lastNameError ||
			emailError ||
			firstName.length < 2
		) {
			// return cant submit form
			setFormError(true);
		} else {
			if (emailArr.includes(email)) {
				setEmailExists(true);
				console.log(emailExists);
				return;
			} else {
				postSubmit();
			}
		}
	};

	return (
		<>
			{emailExists && <p>Email already exists</p>}
			<form onSubmit={handleSubmit} className={style.inputForm}>
				<div className={style.firstNameInput}>
					{firstNameError && <p>First Name Is invalid</p>}
					<input
						type="text"
						placeholder="First Name"
						value={firstName}
						onChange={handleFirstNameInput}
						required
					/>
				</div>
				<div className={style.lastNameInput}>
					{lastNameError && <p>Surname Is invalid</p>}
					<input
						type="text"
						placeholder="Surname"
						value={lastName}
						onChange={handleLastNameInput}
						required
					/>
				</div>
				<div className={style.emailInput}>
					{emailError && <p>Email Is invalid</p>}
					<input
						type="email"
						placeholder="Your Email"
						value={email}
						onChange={handleEmailInput}
						required
					/>
				</div>
				<button>Subscribe</button>
				{formError && <p>Form Is Invalid</p>}
			</form>
		</>
	);
};

export default Subscribe;
