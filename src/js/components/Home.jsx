import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const obtenerTareas = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/jhonedwin99")
			console.log(response)
			const data = await response.json()
			console.log(data.todos)
			setTasks(data.todos)
		} catch (error) {
			console.log(error)
		}
	}

	const addTask = () => {
		if (inputValue.trim() !== "") {
			fetch('https://playground.4geeks.com/todo/todos/jhonedwin99', {
				method: "POST",
				body: JSON.stringify({
					"label": inputValue,
					"is_done": false
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					console.log(resp.ok);
					obtenerTareas();
					setInputValue("")
					return resp.json();
				})
				.then(data => {
					console.log(data);
				})
				.catch(error => {
					console.log(error);
				});
		}
	};
	const deleteTask = async (id) => {
		try {
			await fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
				method: "DELETE"
			});
			obtenerTareas();
		} catch (error) {
			console.error(error);
		}
	};

	const clearALL = async () => {
		try {
			await fetch("https://playground.4geeks.com/todo/users/jhonedwin99",{
				method: "DELETE",
			});
			await fetch("https://playground.4geeks.com/todo/users/jhonedwin99",{
				method: "POST",
				headers: {
					"content-Type": "application/json",
				},
				body: JSON.stringify([]),
			});
			setTasks([]);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		obtenerTareas()
	}, []);

	return (
		<div className="container">
			<h1>todos</h1>
			<div className="input-group">
				<input
					type="text"
					placeholder="Que hay que hacer?"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							addTask();
						}
					}}
				/>
			</div>
			<ul className="task-list">
				{tasks.length === 0 ? (
					<li>No hay tareas, añadir tareas</li>
				) : (
					tasks.map((tasks, index) => (
						<li className="task-item" key={tasks.id}>
							<span>{tasks.label}</span>
							<span className="delete" onClick={() => deleteTask(tasks.id)}
							>
								✖
							</span>
						</li>
					))
				)}
			</ul>
			{tasks.length > 0 && (
				<p className="counter">
					{tasks.length} tarea{tasks.length !== 1 && "s"}
				</p>
			)}
			{tasks.length > 0 && (
				<button onClick={clearALL}>
					eliminar todas
				</button>
			)}

		</div>
	);
};

export default Home;