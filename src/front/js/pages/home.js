import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>IG Clone - Prueba Técnica</h1>
		</div>
	);
};
