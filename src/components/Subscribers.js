import React, { useState, useEffect } from "react";
import style from "../pages/Dashboard.module.scss";

const Subscribers = (props) => {
	const [userData, setUserData] = useState(null);

	async function setData() {
		setUserData(props.userData);
	}
	useEffect(() => {
		setData();
	}, [props]);

	console.log(userData);
	if (userData != null)
		return (
			<div>
				<div className={style.tableContainer}>
					<h2>Subscribers</h2>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Last Name</th>
								<th>Subscribed Date</th>
								<th>Categories</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{userData.map((user) => (
								<tr>
									<td>{user.firstName}</td>
									<td>{user.lastName}</td>
									<td>
										{user.createdAt.toDate().toDateString()}
									</td>
									<td>
										{user.CareerOpportunities
											? "Career Opportunities" + ", "
											: ""}
										{user.Events ? "Events" + ", " : ""}
										{user.travelOpportunities
											? "Travel Opportunities" + ", "
											: ""}
										{user.SpaceOriginUpdates
											? "Space Origin Updates" + ", "
											: ""}
									</td>
									<td>{user.email}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
};

export default Subscribers;
