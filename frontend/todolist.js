const paginationContent = document.querySelector(".pg-content");
const inputElement = document.querySelector(".input-todo");
const buttonElement = document.querySelector(".btn");
const checkAllElement = document.querySelector(".check-all");
const ulElement = document.querySelector(".todo-list");
const allTodoBtnElement = document.querySelector(".all-todo");
const activeTodoBtnElement = document.querySelector(".active-todo");
const completedTodoBtnElement = document.querySelector(".completed-todo");
const allChecked = document.querySelector(".all-checked");
const deleteAllCompletedTodo = document.querySelector(".btn-danger");
const numberOfTasksDisplayed = 5;
const escapeKey = "Escape";
const enterKey = "Enter";

let statePageToDo = "All";
let thisPage = 1;
let lastPage = 1;
let todoList = [];

async function addTask(data) {
  try {
    const response = await fetch("http://localhost:4001/api/tasks/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
async function getAllTodos() {
  try {
    const response = await fetch("http://localhost:4001/tasks/", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.status === 200) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.log("There was a problem with the request", error);
  }
}

async function updateTask(data) {
  try {
    const response = await fetch(`http://localhost:4001/tasks/${+data.id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: +data.id,
        text: data.text,
        isCompleted: data.isCompleted,
      }),
    });

    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.log("Update Failed!", error);
  }
}

async function updateAllTaskStatus(state) {
  try {
    const response = await fetch("http://localhost:4001/tasks/", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted: state }),
    });

    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.log("Update Failed!", error);
  }
}

async function deleteTodo(id) {
  try {
    const response = await fetch(`http://localhost:4001/tasks/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.log("Update Failed!", error);
  }
}

async function deleteAllComplitedTodo() {
  try {
    const response = await fetch("http://localhost:4001/tasks/", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return true;
    }
  } catch (error) {
    alert("Delete failed!");
  }
}
function rerenderTask() {
  getAllTodos().then((array) => {
    todoList = array;
    renderTodo();
  });
}
rerenderTask();
function firstMessage() {
  if (todoList.length === 0) {
    document.querySelector(".first-message").style.display = "block";
    allChecked.checked = false;
    allChecked.disabled = true;
  } else {
    document.querySelector(".first-message").style.display = "none";
    allChecked.disabled = false;
  }
}
firstMessage();

function statePage(newPage) {
  if (newPage !== lastPage) {
    thisPage = newPage;
  } else {
    thisPage = Math.ceil(filterArray().length / numberOfTasksDisplayed);
  }
}

function getIndexArray(id) {
  const indexArray = todoList.findIndex(
    (element) => Number(element.id) === Number(id)
  );
  if (indexArray !== -1) {
    return indexArray;
  }
  alert(`${id} is not in the array`);
}

function clearTodos() {
  ulElement.innerHTML = "";
}

function addTodoInArray() {
  const textToDo = inputElement.value.replace(/\s+/g, " ").trim();
  if (textToDo !== "") {
    const data = { id: Date.now(), text: textToDo, isCompleted: false };
    addTask(data).then((data) => renderAllToDo());
  }
  thisPage = Math.ceil(todoList.length / numberOfTasksDisplayed);

  statePage(thisPage);
  firstMessage();
}

function filterCountTodo() {
  const activeTasks = todoList.filter(
    (element) => element.isCompleted === false
  );
  const complitedTasks = todoList.length - activeTasks.length;
  allTodoBtnElement.textContent = `All(${todoList.length})`;
  activeTodoBtnElement.textContent = `Active(${activeTasks.length})`;
  completedTodoBtnElement.textContent = `Completed(${complitedTasks})`;
}

function createDivTextTodo(textTodo, id) {
  const spanElementTextTodo = document.createElement("span");
  spanElementTextTodo.id = id;
  spanElementTextTodo.className = "text-todo";
  const text = document.createTextNode(textTodo);
  spanElementTextTodo.appendChild(text);
  return spanElementTextTodo;
}

function changeTaskState(e) {
  const idTodo = e.target.id;
  const taskToChange = todoList.find(
    (element) => Number(element.id) === Number(idTodo)
  );
  if (taskToChange) {
    taskToChange.isCompleted = !taskToChange.isCompleted;
    updateTask(taskToChange).then(() => rerenderTask());
  }
}

function createCheckBox(id, isCompleted) {
  const inputElement = document.createElement("input");
  inputElement.id = id;
  inputElement.className = "check-box";
  inputElement.setAttribute("type", "checkbox");
  inputElement.checked = isCompleted;
  inputElement.addEventListener("click", changeTaskState);
  return inputElement;
}

function deleteTask(e) {
  const { id } = e.target;
  deleteTodo(Number(id)).then(() => rerenderTask());
}

function createDeleteButton(idTodo) {
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.id = idTodo;
  const text = document.createTextNode("X");
  deleteButton.appendChild(text);
  deleteButton.addEventListener("click", deleteTask);
  return deleteButton;
}

function createDivContentTodo(textTodo, id, isCompleted) {
  const divElementContent = document.createElement("div");
  divElementContent.id = id;
  divElementContent.className = "content-todo";
  const divText = createDivTextTodo(textTodo, id);
  divElementContent.append(createCheckBox(id, isCompleted));
  divElementContent.append(divText);
  divElementContent.append(createDeleteButton(id));
  return divElementContent;
}

function createTodo(id, textTodo, isCompleted) {
  const TodoList = document.querySelector(".todo-list");
  const divContent = createDivContentTodo(textTodo, id, isCompleted);
  TodoList.append(divContent);
}

function changeTaskText(liTaskElement) {
  const inputElement = document.createElement("textArea");
  inputElement.style = "height:228px";
  inputElement.className = "text-todo";
  inputElement.type = "text";
  inputElement.value = liTaskElement.textContent;
  liTaskElement.replaceWith(inputElement);
  inputElement.focus();

  function saveСhanges() {
    if (inputElement.value.trim() === "") {
      rerenderTask();
    } else {
      todoList[getIndexArray(liTaskElement.id)].text = inputElement.value
        .replace(/\s+/g, " ")
        .trim();

      const data = todoList.find((item) => +item.id === +liTaskElement.id);
      updateTask(data).then(() => rerenderTask());
    }
  }

  function handleKeyPressSaveOrCancel(event) {
    if (event.key === escapeKey) {
      inputElement.removeEventListener("blur", saveСhanges);
      rerenderTask();
    }
    if (event.key === enterKey) {
      if (inputElement.value.trim() === "") {
        rerenderTask();
      } else {
        todoList[getIndexArray(liTaskElement.id)].text = inputElement.value
          .replace(/\s+/g, " ")
          .trim();
        const data = todoList.find((item) => +item.id === +liTaskElement.id);
        updateTask(data).then((value) => rerenderTask());
      }
    }
  }
  inputElement.addEventListener("blur", saveСhanges);
  inputElement.addEventListener("keydown", handleKeyPressSaveOrCancel);
}

function addDefaultClass() {
  const infoTodos = document.querySelectorAll(".info-todos");
  const htmlCollection = infoTodos[0].children;
  Array.from(htmlCollection).forEach((element) => {
    element.classList.remove("active-type-task");
    element.classList.add("no-active");
  });
}

function renderAllToDo() {
  addDefaultClass();
  allTodoBtnElement.classList.add("active-type-task");
  statePageToDo = "All";
  thisPage = Math.ceil(filterArray().length / numberOfTasksDisplayed);
  rerenderTask();
}

function renderActiveToDo() {
  addDefaultClass();
  activeTodoBtnElement.classList.add("active-type-task");
  statePageToDo = "Active";
  thisPage = Math.ceil(filterArray().length / numberOfTasksDisplayed);
  rerenderTask();
}

function renderCompletedToDo() {
  addDefaultClass();
  completedTodoBtnElement.classList.add("active-type-task");
  statePageToDo = "Completed";
  thisPage = Math.ceil(filterArray().length / numberOfTasksDisplayed);
  rerenderTask();
}

function createElementPagination(page) {
  const content = `<button class="pg-btn-page">${page + 1}</button>`;
  return content;
}

function pagination() {
  const arrayTodo = filterArray();
  paginationContent.innerHTML = "";
  const countPage = Math.ceil(arrayTodo.length / numberOfTasksDisplayed);
  lastPage = countPage;
  for (let page = 0; page < countPage; page++) {
    paginationContent.innerHTML += createElementPagination(page);
  }
}

function listTasksForCurrentPage(numberPage, array) {
  const firstIndex = numberOfTasksDisplayed * numberPage;
  const secondIndex = numberOfTasksDisplayed * numberPage;
  const tasksForCurrentPage = array.slice(
    firstIndex - numberOfTasksDisplayed,
    secondIndex
  );
  return tasksForCurrentPage;
}

function filterArray() {
  const todolistFilter = todoList.filter((element) => {
    if (statePageToDo === "All") {
      return true;
    }
    if (statePageToDo === "Active") {
      return !element.isCompleted;
    }
    if (statePageToDo === "Completed") {
      return element.isCompleted;
    }
  });
  return todolistFilter;
}

function changeAllTaskState(checkedState) {
  todoList.forEach((element) => {
    element.isCompleted = checkedState;
  });
  updateAllTaskStatus(checkedState);
  rerenderTask();
}

function checkClicks(e) {
  if (e.target.className === "pg-btn-page") {
    thisPage = Number(e.target.textContent);
    statePage(thisPage);
    rerenderTask();
  }
}

function addCheckIfAllElementsChecked() {
  const result = todoList.every((element) => element.isCompleted === true);
  if (result) {
    allChecked.checked = true;
  } else {
    allChecked.checked = false;
  }
}

function deleteAllCompleted() {
  deleteAllComplitedTodo();
  rerenderTask();
}

function paginationActivePage() {
  paginationContent.childNodes.forEach((element) => {
    if (Number(element.textContent) === thisPage) {
      element.className = "pg-btn-page-active";
    }
  });
}

function renderTodo() {
  clearTodos();
  filterCountTodo();
  statePage(thisPage);
  const filteredArray = filterArray();
  const paginatedArray = listTasksForCurrentPage(thisPage, filteredArray);
  paginatedArray.forEach((element) => {
    createTodo(Number(element.id), element.text, element.isCompleted);
  });
  pagination();
  addCheckIfAllElementsChecked();
  paginationActivePage();
  firstMessage();
  inputElement.value = "";
}

function toggleCheckboxOrEditTask(e) {
  if (e.target.type === "checkbox") {
    filterCountTodo();
  }
  if (e.target.className === "text-todo" && e.detail === 2 && e.target.id) {
    changeTaskText(e.target);
  }
}

function toggleAllTasks(e) {
  const checkedState = e.target.checked;
  changeAllTaskState(checkedState);
}

function handlerAddInTodoArray() {
  rerenderTask();
  addTodoInArray();
}

function handleEnterKeyPress(e) {
  if (e.code === enterKey) {
    addTodoInArray();
  }
}

buttonElement.addEventListener("click", handlerAddInTodoArray);

inputElement.addEventListener("keypress", handleEnterKeyPress);

ulElement.addEventListener("click", toggleCheckboxOrEditTask);

allTodoBtnElement.addEventListener("click", renderAllToDo);

activeTodoBtnElement.addEventListener("click", renderActiveToDo);

completedTodoBtnElement.addEventListener("click", renderCompletedToDo);

checkAllElement.addEventListener("click", toggleAllTasks);

paginationContent.addEventListener("click", checkClicks);

deleteAllCompletedTodo.addEventListener("click", deleteAllCompleted);
