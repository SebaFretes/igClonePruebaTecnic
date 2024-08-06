import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { CreatePost } from "./createPost";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (!store.token) {
			navigate('/login');
		}
		actions.getProfile();
	}, [])

	return (
		<>
			{
				!store.token &&
				<h2 className="text-center">This route is for Authorized Users only</h2>
			}
			{
				store.token &&
				<>
					<h2 className="text-center">
						<CreatePost />
					</h2>
				</>
			}
		</>
	)
};
