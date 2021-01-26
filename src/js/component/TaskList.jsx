import React, { useState, useEffect } from "react";
import { Button } from "bootstrap";

export const TaskList = () => {
	const [taskApi, setTaskApi] = useState([]);
	const [text, setText] = useState("");
	const [listElement, setListElement] = useState([]);

	const styleObj = {
		color: "black"
	};

	// let TextValue = e => {
	// 	setText(e.target.value);
	// };

	// let TaskAdd = event => {
	// 	if (event.key === "Enter") {
	// 		let newTask = event.target.value;
	// 		if (newTask) {
	// 			setTaskApi(taskApi => [...taskApi, text]);
	// 			let lista = document.querySelector("#inforeceive");
	// 			lista.value = "";
	// 		}
	// 	}
	// };

	//Eliminar task
	let removeItem = id => {
		setTaskApi(taskApi => {
			return taskApi.filter((item, index) => {
				return index !== id;
			});
		});
	};

	//Función para marcar como "realizada una tarea"
	const isDone = indexToCross => {
		setTaskApi(
			taskApi.map((task, index) => {
				if (index == indexToCross) {
					task.done = !task.done;
				}
				return task;
			})
		);
	};

	let url = "https://assets.breatheco.de/apis/fake/todos/user/pilarguz10";
	let optionsPut = {
		method: "PUT",
		body: JSON.stringify(taskApi),
		headers: {
			"Content-Type": "application/json"
		}
	};
	let optionsGET = {
		method: "GET"
	};

	fetch(url, optionsPut)
		.then(respuesta => {
			if (respuesta.status >= 200 && respuesta.status < 300) {
				console.log("Método PUT OK");
				return respuesta.json();
			}
		})

		.then(body => {
			console.log("Body:", JSON.stringify(body));
		})

		.catch(error => console.error("Error:" + error));

	useEffect(() => {
		//Fetch con método GET para obtener las tareas de la API
		fetch(url, optionsGET)
			.then(respuesta => {
				if (respuesta.status >= 200 && respuesta.status < 300) {
					console.log("El request se hizo bien");
					return respuesta.json();
				}
			})

			.then(responseAsJson => {
				setTaskApi(responseAsJson);
			})

			.catch(error => console.error("Error:" + error));
	}, []); //Fin de useEffect

	//Cuando se actualice taskApi
	useEffect(
		() => {
			//Fetch PUT para actualizar la lista en la API
			fetch(url, optionsPut)
				.then(respuesta => {
					if (respuesta.status >= 200 && respuesta.status < 300) {
						console.log("Método PUT OK");
						return respuesta.json();
					}
				})

				.then(body => {
					console.log("Body:", JSON.stringify(body));
				})

				.catch(error => console.error("Error:" + error));

			setListElement(
				taskApi.map((task, index) => {
					let crossTask = "myLi";
					if (task.done) {
						crossTask += " taskDone";
					}
					return (
						//<div className={crossTask}

						<li key={index} className={crossTask}>
							{task.label}
							<button
								className="btnRemove"
								onClick={() => removeItem(index)}>
								<i className="fas fa-times" />
							</button>

							<button
								id="done"
								className="btnVisible"
								onClick={() => {
									isDone(index);
								}}>
								<i className="fas fa-check" />
							</button>
						</li>

						//</div>
					);
				})
			);
		},
		[taskApi]
	);

	return (
		<div className="container">
			<div className="card container ">
				<div className="pin">
					<i className="fas fa-thumbtack fa-lg" />
				</div>
				<h1 style={styleObj}>TO DO LIST</h1>
				<form
					onSubmit={event => {
						event.preventDefault();
						if (text != "") {
							//doesn't allow adding tasks without content
							setTaskApi([
								...taskApi,
								{ label: text, done: false }
							]);
							setText("");
						}
					}}>
					<input
						type="text"
						placeholder="New task"
						value={text}
						onChange={event => setText(event.target.value)}
					/>
				</form>

				<ul id="myUlist" className="myUl">
					{listElement}
				</ul>
				<div>
					<span className="badge badge-light">
						{taskApi.length} Tareas
					</span>
					<button class="btn">
						<i class="fa fa-trash" />
					</button>
				</div>
			</div>
		</div>
	);
}; //Fin de la función principal
