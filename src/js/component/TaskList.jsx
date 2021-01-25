import React, { useState, useEffect } from "react";
import { Button } from "bootstrap";

export function TaskList(e) {
	const [task, setTask] = useState([]);
	const [text, setText] = useState("");

	const styleObj = {
		color: "black"
	};

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
					<div className="listItem">
						<li key={i} className="myLi">
							{taskitem}

							<button
								className="btn"
								onClick={() => TaskDelete(i)}>
								<i className="fas fa-times" />
							</button>
						</li>
					</div>
				);
			})
		);
	});
	return (
		<div className="container">
			<div className="card container ">
				<div className="pin">
					<i className="fas fa-thumbtack fa-lg" />
				</div>
				<h1 style={styleObj}>TO DO LIST</h1>
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
				<div>
					<span className="badge badge-light">
						{task.length + ""} Tareas
					</span>
				</div>
			</div>
		</div>
	);
}
