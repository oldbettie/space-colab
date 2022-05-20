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
import Subscribers from "../components/Subscribers";
import style from "./Dashboard.module.scss";

const Dashboard = () => {
	const [userData, setUserData] = useState(null);

	async function getUsers() {
		let users = [];
		const usersRef = collection(db, "users");
		const data = await getDocs(usersRef);
		data.docs.forEach((user) => users.push(user.data()));
		console.log(users);
		setUserData(users);
	}

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div>
			<Subscribers userData={userData} />
		</div>
	);
};

export default Dashboard;
