showtask(0);
var inputBox = document.getElementById("input-box");
var addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", addTask);
var taskObj = [];
function addTask() {
	var inputBoxVal = inputBox.value.trim();
	if (inputBoxVal == "") {
		return;
	}
	var newTask = {
		task: inputBox.value,
		status: false,
	};
	var localTask = localStorage.getItem("tasks");

	if (localTask == null) {
		taskObj = [];
	} else {
		console.log(localTask);
		taskObj = JSON.parse(localTask);
	}

	taskObj = [...taskObj, newTask];
	localStorage.setItem("tasks", JSON.stringify(taskObj));

	inputBox.value = "";
	showtask(0);
}

function showtask(type) {
	let localTask = localStorage.getItem("tasks");
	let addedtasklist = document.getElementById("task-list");
	if (localTask == null) {
		taskObj = [];
	} else {
		taskObj = JSON.parse(localTask);
	}

	let html = "";

	if (type == 0) {
		taskObj.forEach((item, index) => {
			if (item.status == true) {
				html += `<li class="completed"><span onclick=changeStatus(${index})> ${item.task}</span>  <button onclick=deleteTask(${index})>X</button></li>`;
			} else {
				html += `<li><span onclick=changeStatus(${index})> ${item.task}</span>  <button onclick=deleteTask(${index})>X</button></li>`;
			}
		});
	}

	if (type == 1) {
		taskObj.forEach((item, index) => {
			if (item.status == false) {
				html += `<li><span onclick=changeStatus(${index})> ${item.task}</span>  <button onclick=deleteTask(${index})>X</button></li>`;
			}
		});
	}

	if (type == 2) {
		taskObj.forEach((item, index) => {
			if (item.status == true) {
				html += `<li class="completed"><span onclick=changeStatus(${index})> ${item.task}</span>  <button onclick=deleteTask(${index})>X</button></li>`;
			}
		});
	}

	addedtasklist.innerHTML = html;
	document.getElementById("taskCount").innerText =
		taskObj.length + " tasks left";
}

function changeStatus(index) {
	let localTask = localStorage.getItem("tasks");
	taskObj = JSON.parse(localTask);
	taskObj[index].status = !taskObj[index].status;
	localStorage.setItem("tasks", JSON.stringify(taskObj));
	showtask(0);
}

function deleteTask(index) {
	let localTask = localStorage.getItem("tasks");
	taskObj = JSON.parse(localTask);
	taskObj.splice(index, 1);
	localStorage.setItem("tasks", JSON.stringify(taskObj));
	showtask(0);
}

function clearCompleted() {
	let localTask = localStorage.getItem("tasks");
	taskObj = JSON.parse(localTask);

	taskObj.forEach((item, index) => {
		if (item.status == true) taskObj.splice(index, 1);
	});

	localStorage.setItem("tasks", JSON.stringify(taskObj));
	showtask(0);
}

function completeAllTasks() {
	let localTask = localStorage.getItem("tasks");
	taskObj = JSON.parse(localTask);

	taskObj.forEach((item, index) => {
		item.status = true;
	});

	localStorage.setItem("tasks", JSON.stringify(taskObj));
	showtask(0);
}
