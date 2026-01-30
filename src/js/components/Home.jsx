import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const addTask = () => {
		if (inputValue.trim() !== "") {
			setTasks([...tasks, inputValue]);
			setInputValue("");
		}
	};
	const deleteTask = (indexToDelete) => {
		setTasks(tasks.filter((__, index) => index !== indexToDelete));
	}
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
						<li className="task-item" key={index}>
							<span>{tasks}</span>
							<span className="delete" onClick={() => deleteTask(index)}
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
		</div>
	);
};

export default Home;