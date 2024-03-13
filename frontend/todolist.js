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
  const indexArray = todoList.findIndex((element) => element.id === Number(id));
  if (indexArray !== -1) {
    return indexArray;
  }
}

function clearTodos() {
  ulElement.innerHTML = "";
}

function addTodoInArray() {
  const textToDo = inputElement.value.replace(/\s+/g, " ").trim();
  if (textToDo !== "") {
    todoList.push({ id: Date.now(), todoText: textToDo, status: false });
  }
  thisPage = Math.ceil(todoList.length / numberOfTasksDisplayed);
  renderAllToDo();
  statePage(thisPage);
  firstMessage();
}

function filterCountTodo() {
  const activeTasks = todoList.filter((element) => element.status === false);
  const complitedTasks = todoList.length - activeTasks.length;
  allTodoBtnElement.textContent = `All(${todoList.length})`;
  activeTodoBtnElement.textContent = `Active(${activeTasks.length})`;
  completedTodoBtnElement.textContent = `Completed(${complitedTasks})`;
}

function createDivTextTodo(textTodo, id) {
  const spanElementTextTodo = document.createElement("span");
  spanElementTextTodo.id = id;
  spanElementTextTodo.className = "text-todo";
  const todoText = document.createTextNode(textTodo);
  spanElementTextTodo.appendChild(todoText);
  return spanElementTextTodo;
}

function changeTaskState(e) {
  const idTodo = e.target.id;
  const taskToChange = todoList.find((element) => element.id === +idTodo);
  if (taskToChange) {
    taskToChange.status = !taskToChange.status;
  }
  renderTodo();
}

function createCheckBox(id, status) {
  const inputElement = document.createElement("input");
  inputElement.id = id;
  inputElement.className = "check-box";
  inputElement.setAttribute("type", "checkbox");
  inputElement.checked = status;
  inputElement.addEventListener("click", changeTaskState);
  return inputElement;
}

function deleteTask(e) {
  const { id } = e.target;
  todoList.splice(getIndexArray(id), 1);
  renderTodo();
}

function createDeleteButton(idTodo) {
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.id = idTodo;
  const todoText = document.createTextNode("X");
  deleteButton.appendChild(todoText);
  deleteButton.addEventListener("click", deleteTask);
  return deleteButton;
}

function createDivContentTodo(textTodo, id, status) {
  const divElementContent = document.createElement("div");
  divElementContent.id = id;
  divElementContent.className = "content-todo";
  const divText = createDivTextTodo(textTodo, id);
  divElementContent.append(createCheckBox(id, status));
  divElementContent.append(divText);
  divElementContent.append(createDeleteButton(id));
  return divElementContent;
}

function createTodo(textTodo, id, status) {
  const TodoList = document.querySelector(".todo-list");
  const divContent = createDivContentTodo(textTodo, id, status);
  TodoList.append(divContent);
}

function changeTaskText(liTaskElement) {
  const inputElement = document.createElement("textArea"); //textArea
  inputElement.style = "height:228px";
  inputElement.className = "text-todo";
  inputElement.type = "text";
  inputElement.value = liTaskElement.textContent;
  liTaskElement.replaceWith(inputElement);
  inputElement.focus();

  function saveСhanges() {
    if (inputElement.value.trim() === "") {
      renderTodo();
    } else {
      todoList[getIndexArray(liTaskElement.id)].todoText = inputElement.value
        .replace(/\s+/g, " ")
        .trim();
      renderTodo();
    }
  }

  function handleKeyPressSaveOrCancel(event) {
    if (event.key === escapeKey) {
      inputElement.removeEventListener("blur", saveСhanges);
      renderTodo();
    }
    if (event.key === enterKey) {
      if (inputElement.value.trim() === "") {
        renderTodo();
      } else {
        todoList[getIndexArray(liTaskElement.id)].todoText = inputElement.value
          .replace(/\s+/g, " ")
          .trim();
        renderTodo();
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
  console.log("1", thisPage);
  renderTodo();
  console.log("1", thisPage);
}

function renderActiveToDo() {
  addDefaultClass();
  activeTodoBtnElement.classList.add("active-type-task");
  statePageToDo = "Active";
  thisPage = Math.ceil(filterArray().length / numberOfTasksDisplayed);
  renderTodo();
}

function renderCompletedToDo() {
  addDefaultClass();
  completedTodoBtnElement.classList.add("active-type-task");
  statePageToDo = "Completed";
  thisPage = Math.ceil(filterArray().length / numberOfTasksDisplayed);
  renderTodo();
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
      return !element.status;
    }
    if (statePageToDo === "Completed") {
      return element.status;
    }
  });
  return todolistFilter;
}

function changeAllTaskState(checkedState) {
  todoList.forEach((element) => {
    element.status = checkedState;
  });
  renderTodo();
}

function checkClicks(e) {
  if (e.target.className === "pg-btn-page") {
    thisPage = Number(e.target.textContent);
    statePage(thisPage);
    renderTodo();
  }
}

function addCheckIfAllElementsChecked() {
  const result = todoList.every((element) => element.status === true);
  if (result) {
    allChecked.checked = true;
  } else {
    allChecked.checked = false;
  }
}

function deleteAllCompleted() {
  todoList = todoList.filter((element) => element.status !== true);
  renderTodo();
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
    createTodo(element.todoText, Number(element.id), element.status);
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
  addTodoInArray();
  renderTodo();
}

function handleEnterKeyPress(e) {
  if (e.code === enterKey) {
    addTodoInArray();
    renderTodo();
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
