import React from "react";
import { TaskList } from "./TaskList.jsx";

//create your first component
export function Home() {
	return (
		<div className="contenedor">
			<div className="text-center mt-5">
				<TaskList />
			</div>
		</div>
	);
}
