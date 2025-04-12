class TodoModel {
    constructor(id, title, description, check, date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.check = check;
        this.date = date;
    }
    markHasDone() {
        this.check = true
    }
}
const estudiarTodo = new TodoModel(1, "estudiar para el parcial", "debo estudiar para el parcial de logica y para el parcial de php objetos", false, "22/22/2025");

const todoList = [estudiarTodo];

function buildTodoList(todoList) {
    todoList.forEach(todo => {
        let container = document.getElementById("section-todo")
        let h2 = document.createElement("h2");
        h2.textContent = "Todo"
        container.appendChild(h2);
        let todoContainer = document.createElement("div");
        todoContainer.className = "todo-container";
        todoContainer.appendChild(buildTodoCheckAndTitle(todo));
        todoContainer.appendChild(buildDateIconAndDateText(todo));
        container.appendChild(todoContainer);
    });
}

function buildTodoCheckAndTitle(todo) {

    //contuctor de check y titulo
    let checkAndTitleContainer = document.createElement("div");
    checkAndTitleContainer.className = "check-and-title-container";


    let checkWrapper = document.createElement("div");
    checkWrapper.className = "checkbox-wrapper";

    let input = document.createElement("input");
    input.type = "checkbox";
    input.checked = "";

    // Crear el elemento SVG
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 35.6 35.6");

    // Crear el círculo de fondo
    const backgroundCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    backgroundCircle.setAttribute("class", "background");
    backgroundCircle.setAttribute("cx", "17.8");
    backgroundCircle.setAttribute("cy", "17.8");
    backgroundCircle.setAttribute("r", "17.8");
    svg.appendChild(backgroundCircle);

    // Crear el círculo de trazo
    const strokeCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    strokeCircle.setAttribute("class", "stroke");
    strokeCircle.setAttribute("cx", "17.8");
    strokeCircle.setAttribute("cy", "17.8");
    strokeCircle.setAttribute("r", "14.37");
    svg.appendChild(strokeCircle);

    // Crear la línea de verificación
    const checkLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    checkLine.setAttribute("class", "check");
    checkLine.setAttribute("points", "11.78 18.12 15.55 22.23 25.17 12.87");
    svg.appendChild(checkLine);

    checkWrapper.appendChild(input);

    checkWrapper.appendChild(svg);
    checkAndTitleContainer.appendChild(checkWrapper);


    let title = document.createElement("h2");
    checkAndTitleContainer.appendChild(checkWrapper);
    title.textContent = todo.title;
    checkAndTitleContainer.appendChild(title);

    return checkAndTitleContainer;

}
function buildDateIconAndDateText(todo) {
    let dateIconAndDateTextContainer = document.createElement("div");
    dateIconAndDateTextContainer.className = "dateIcon-and-dateText-Container"

    let dateIcon = document.createElement("img");
    dateIcon.src = "/images/icons/calendar-24.svg"
    dateIcon.alt = "calendar"
    dateIcon.className = "img date-icon"
    dateIconAndDateTextContainer.appendChild(dateIcon)

    let dateText = document.createElement("p");
    dateText.textContent = todo.date;
    dateIconAndDateTextContainer.appendChild(dateText);

    return dateIconAndDateTextContainer;
}
buildTodoList(todoList);