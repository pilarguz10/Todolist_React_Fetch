import React, { useState, useEffect } from "react";
import { Button } from "bootstrap";

export function TaskList(e) {
	const [task, setTask] = useState([]);
	const [text, setText] = useState("");
	let TextValue = e => {
		setText(e.target.value);
	};
	let TaskAdd = event => {
		if (event.key === "Enter") {
			let newTask = event.target.value;
			if (newTask) {
				setTask(task => [...task, text]);
				let lista = document.querySelector("#inforeceive");
				lista.value = "";
			}
		}
	};

	let TaskDelete = i => {
		task.splice(i, 1);
	};

	const [listItem, setListItem] = useState(null);

	useEffect(() => {
		setListItem(
			task.map((taskitem, i) => {
				return (
					<li key={i} className="myLi">
						{taskitem}
						<button className="btn" onClick={() => TaskDelete(i)}>
							<i className="fas fa-backspace" />
						</button>
					</li>
				);
			})
		);
	});
	return (
		<div className="card container ">
			<h1>To do List</h1>
			<input
				id="inforeceive"
				className="myInput"
				type="text"
				placeholder="Add task"
				onChange={e => TextValue(e)}
				onKeyPress={event => {
					TaskAdd(event);
				}}
			/>
			<ul id="myUlist" className="myUl">
				{listItem}
			</ul>
			<p>{task.length + ""} Tareas</p>
		</div>
	);
}
