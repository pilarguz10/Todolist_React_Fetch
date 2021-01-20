import React, { useState, useEffect } from "react";
import { Button } from "bootstrap";

export function TaskList(e) {
	const [task, setTask] = useState([]);
	const [text, setText] = useState("");
	let MyTextValue = e => {
		setText(e.target.value);
	};
	let MyTaskAdder = event => {
		if (event.key === "Enter") {
			let newTask = event.target.value;
			if (newTask) {
				setTask(task => [...task, text]);
				// console.log(task);
				let myList = document.querySelector("#inputRecive");
				myList.value = "";
			}
		}
	};
	let MyTaskDelete = i => {
		task.splice(i, 1);
		console.log(task);
	};

	const [listItem, setListItem] = useState(null);

	useEffect(() => {
		setListItem(
			task.map((taskitem, i) => {
				return (
					<li key={i} className="myLi">
						{taskitem}
						<button
							className="hide btn"
							onClick={() => MyTaskDelete(i)}>
							<i className="far fa-times-circle" />
						</button>
					</li>
				);
			})
		);
	});
	return (
		<div className="card container">
			<h1>To do List</h1>
			<input
				id="inputRecive"
				className="myInput"
				type="text"
				placeholder="New Task"
				onChange={e => MyTextValue(e)}
				onKeyPress={event => {
					MyTaskAdder(event);
				}}
			/>
			<ul id="myUlist" className="myUl">
				{listItem}
			</ul>
			<p>{task.length + ""} Tareas</p>
		</div>
	);
}
