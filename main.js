class TodoModel {
    constructor(id, title, description, check, date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.check = check;
        this.date = date;
    }
}
const estudiarTodo = new TodoModel(1, "estudiar para el parcial", "debo estudiar para el parcial de logica y para el parcial de php objetos", false, "22/22/2025");

const estudiarCompleted = new TodoModel(2, "estudiar para el parcial 2", "debo estudiar para el parcial de logica y para el parcial de php objetos", true, "22/22/2025");

let allTodoList = [estudiarTodo, estudiarCompleted];

const AllTodoPending = [];

const AllTodoCompleted = [];

const container = document.getElementById("section-todo")

function initializeTodoLists(allTodoList) {
    allTodoList.forEach(todo => {
        if (!todo.check) {

            AllTodoPending.push(todo);
        } else {
            AllTodoCompleted.push(todo);
        }
    });
}
buildTodoLists();

function buildTodoLists() {
    // Limpiar el contenedor antes de construir la interfaz
    container.innerHTML = "";
    cleanSections();
    initializeTodoLists(allTodoList)
    // Crear el título de pendientes si hay elementos
    if (AllTodoPending.length > 0) {
        let todoCompletedContainer = document.createElement("div");

        let todoCompleted = document.createElement("div");
        todoCompleted.className = "d-flex flex-column gap-5"

        let h2Pending = document.createElement("h2");
        h2Pending.textContent = "TO DO";

        todoCompletedContainer.appendChild(h2Pending);

        AllTodoPending.forEach(todo => {
            todoCompleted.appendChild(buildTodos(todo));
        });
        todoCompletedContainer.appendChild(todoCompleted);
        container.appendChild(todoCompletedContainer);
    }

    // Crear el título de completados si hay elementos
    if (AllTodoCompleted.length > 0) {
        let todoCompletedContainer = document.createElement("div");

        let todoCompleted = document.createElement("div");
        todoCompleted.className = "d-flex flex-column gap-5"

        let h2Completed = document.createElement("h2");
        h2Completed.textContent = "COMPLETED";
        todoCompletedContainer.appendChild(h2Completed);


        AllTodoCompleted.forEach(todo => {
            todoCompleted.appendChild(buildTodoCompleteds(todo));
        });
        todoCompletedContainer.appendChild(todoCompleted);
        container.appendChild(todoCompletedContainer);
    }
}

function buildTodos(todo) {

    let todoContainer = document.createElement("div");
    todoContainer.onclick = //llamar a la funcion del modal pasandole el objeto
    todoContainer.className = "todo-container d-flex justify-content-between p-4 align-items-center border border-3 border-secondary-dark rounded-4 gap-4";
    todoContainer.addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        toogleModalViewContent(todo)
    })
    todoContainer.appendChild(buildTodoCheckAndTitle(todo));
    todoContainer.appendChild(buildDateIconAndDateText(todo));
    return todoContainer;
}

function buildTodoCompleteds(todo) {

    // let container = document.getElementById("section-todo")
    // let h2 = document.createElement("h2");
    // h2.textContent = "COMPLETED"
    // container.appendChild(h2);
    let todoContainer = document.createElement("div");
    todoContainer.onclick = //llamar a la funcion del modal pasandole el objeto
        todoContainer.className = "todo-completed-container d-flex justify-content-between p-4 align-items-center border border-3 border-secondary-dark rounded-4";
    todoContainer.appendChild(buildTodoCheckAndTitle(todo));
    todoContainer.appendChild(buildDateIconAndDateText(todo));
    return todoContainer;

}

function buildTodoCheckAndTitle(todo) {

    //contuctor de check y titulo
    let checkAndTitleContainer = document.createElement("div");
    checkAndTitleContainer.className = "check-and-title-container d-flex gap-2 align-items-center";


    let checkWrapper = document.createElement("div");
    checkWrapper.className = "checkbox-wrapper";

    let input = document.createElement("input");
    input.type = "checkbox";
    input.checked = todo.check;
    input.onclick = function () {
        todo.check = input.checked;
        buildTodoLists();
    };

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
    dateIconAndDateTextContainer.className = "dateIcon-and-dateText-Container d-flex align-items-center gap-2 justify-content-between position-relative";

    // Contenedor para el icono de fecha y texto
    let dateContent = document.createElement("div");
    dateContent.className = "d-flex align-items-center gap-2";

    let dateIcon = document.createElement("img");
    dateIcon.src = "/images/icons/calendar-24.svg";
    dateIcon.alt = "calendar";
    dateIcon.className = "date-icon d-inline";
    dateContent.appendChild(dateIcon);

    let textContainer = document.createElement("div");
    let dateText = document.createElement("p");
    dateText.textContent = todo.date;
    dateText.className = "d-inline mb-0";
    textContainer.appendChild(dateText);
    dateContent.appendChild(textContainer);

    dateIconAndDateTextContainer.appendChild(dateContent);

    // Botón de tres puntos usando el sprite SVG
    let dotsButton = document.createElement("button");
    dotsButton.className = "btn btn-link p-0 dots-button";
    dotsButton.innerHTML = `
        <svg class="dots-icon" width="24" height="24">
            <use href="images/icons/icons.svg#icon-dots"></use>
        </svg>
    `;
    //todo: averiguar porque no funciona :
    // // Botón de tres puntos usando el sprite SVG
    // let dotsButton = document.createElement("button");
    // dotsButton.className = "btn btn-link p-0 dots-button";
    // dotsIcon = document.createElement("svg");
    // dotsIcon.className = "dots-icon";
    // dotsIcon.style = "dots-icon";


    // dotsUse = document.createElement("use");
    // dotsUse.setAttribute("href","images/icons/icons.svg#icon-dots");

    // dotsIcon.appendChild(dotsUse);
    // dotsButton.appendChild(dotsIcon)


    // Contenedor para el menú (flotante)
    let menuContainer = document.createElement("div");
    menuContainer.className = "menu-floating-container";
    menuContainer.style.display = "none";

    // Evento para mostrar/ocultar el menú
    dotsButton.addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();

        // Alternar visibilidad
        if (menuContainer.style.display === "none") {
            // Ocultar otros menús que puedan estar abiertos
            document.querySelectorAll('.menu-floating-container').forEach(menu => {
                menu.style.display = "none";
            });

            menuContainer.style.display = "block";

            // Agregar el menú solo cuando se hace click (optimización)
            if (!menuContainer.hasChildNodes()) {
                const menu = buildCardMenu(todo);
                menu.style.minWidth = "180px"; // Ancho adecuado para el menú
                menuContainer.appendChild(menu);
            }
        } else {
            menuContainer.style.display = "none";
        }
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener("click", function () {
        menuContainer.style.display = "none";
    });

    // Evitar que el click en el menú lo cierre
    menuContainer.addEventListener("click", function (e) {
        e.stopPropagation();
    });

    dateIconAndDateTextContainer.appendChild(dotsButton);
    dateIconAndDateTextContainer.appendChild(menuContainer);

    return dateIconAndDateTextContainer;
}
function cleanSections() {
    container.innerHTML = "";
    AllTodoCompleted.length = 0;;
    AllTodoPending.length = 0;;
}
function findTodoById(todo) {
    return allTodoList.find(todo => todo.id === todoIdToFind);

}
//metodo que permite cerrar el modal
function closeModal() {
    const modalElement = document.getElementById("exampleModal");
    const modalInstance = bootstrap.Modal.getInstance(modalElement) 
        || new bootstrap.Modal(modalElement);
    modalInstance.hide();
}


//metodo que se encarga de eliminar un todo por id
function deletedById(todoId) {
    let index = allTodoList.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      allTodoList.splice(index, 1);
    }     
    buildTodoLists();

}

//funcion que se encarga de crear un todo 
function createTask(todo) {
    console.log("entro al create")
    const maxId = allTodoList.reduce((max, todo) => {
        return todo.id > max ? todo.id : max;
    }, 0);
    console.log("maxId" ,maxId);
    allTodoList.push(new TodoModel(maxId + 1, todo.title, todo.description, false, todo.date));
    closeModal();
    cleanSections();
    buildTodoLists();
}   
//funcion que se encarga de hacer un update al todo
function updateTask(todo) {
    console.log("entro al update")
    const form = document.getElementById("todoForm");
    const todoId = parseInt(form.dataset.editId);
    allTodoList = allTodoList.map(todomap => {
        if (todomap.id === todoId) {
            return {
                ...todomap,
                title: todo.title,
                description: todo.description,
                date: todo.date
            };
        }
        return todomap;
    });
    closeModal();
    cleanSections();
    buildTodoLists();
}

//funcion que se encarga de renderizar los datos 
// seleccionados y impactar el cambio en un mismo objeto    
function toogleModal(todo,isEdit){

    const modalElement = document.getElementById('exampleModal');
    const myModal = bootstrap.Modal.getOrCreateInstance(modalElement);
        const form = document.getElementById("todoForm");
    
    // Cambiar el título del modal para edición
    if(isEdit){
    document.getElementById('exampleModalLabel').textContent = 'Editar Tarea';
    // Establecer valores en los inputs (usando .value en lugar de textContent)
    document.getElementById("titleInput").value = todo.title;
    document.getElementById("descriptionInput").value = todo.description;
    document.getElementById("dateInput").value = todo.date;
    // Agregar ID del todo como dato oculto para la actualización
    form.dataset.editId = todo.id;    
    }    
    myModal.show();
}
function toogleModalViewContent(todo){

    const modalElement = document.getElementById('viewContent');
    const myModal = bootstrap.Modal.getOrCreateInstance(modalElement);
    const form = document.getElementById("todoForm");
    // Cambiar el título del modal para edición
    document.getElementById('exampleModalLabel').textContent = 'Editar Tarea';
    // Establecer valores en los inputs (usando .value en lugar de textContent)
    document.getElementById("titleInput").value = todo.title;
    document.getElementById("descriptionInput").value = todo.description;
    document.getElementById("dateInput").value = todo.date;
    // Agregar ID del todo como dato oculto para la actualización
    form.dataset.editId = todo.id;    
    myModal.show();
}
function AddContainer(){
   addContain = document.getElementById("add-container");
   addContain.addEventListener("click", function (e) {
    toogleModal(null,false);
    })

    }
//Funcion que decide si es un caso de update o create
function handleSave() {
    const form = document.getElementById("todoForm");
    const todoData = {
        id: form.elements.id.value,
        title: form.elements.title.value,
        description: form.elements.description.value,
        date: form.elements.date.value
    };
    console.log(todoData,"----------------->")
    const isEdit = form.dataset.editId;

    if (isEdit) {
        // Lógica para actualizar
        updateTask(todoData,form);
    } else {
        // Lógica para crear nuevo
        createTask(todoData,form);
    }
    // Limpiar ID de edición
    delete form.dataset.editId;
}

//funcion que construyo los botones de editar y eliminar
function buildCardMenu(todo) {
    // Crear contenedor principal card
    const card = document.createElement("div");
    card.className = "card";

    // Crear lista ul
    const list = document.createElement("ul");
    list.className = "list";

    const renameElement = document.createElement("li");
    renameElement.className = "element rename";
    renameElement.style.setProperty("--color", "#045879");
    renameElement.style.setProperty("--hover-color", "#fff");

    const renameLabel = document.createElement("label");
    renameLabel.htmlFor = "rename";
    renameLabel.addEventListener("click", function (e) {
    
    })

    const renameInput = document.createElement("input");
    renameInput.type = "radio";
    renameInput.id = "rename";
    renameInput.name = "filed";
    renameInput.checked = true;

    const renameIcon = document.createElement("svg");
    renameIcon.className = "icon";
    renameIcon.setAttribute("width", "25");
    renameIcon.setAttribute("height", "25");

    const renameUse = document.createElement("use");
    renameUse.setAttribute("href", "images/icons/icons.svg#icon-pencil");

    renameIcon.appendChild(renameUse);
    renameLabel.appendChild(renameInput);
    renameLabel.appendChild(renameIcon);
    renameLabel.appendChild(document.createTextNode(" Editar"));
    renameLabel.addEventListener("click", function (e) {
    toogleModal(todo,true);
    })
    renameElement.appendChild(renameLabel);

    // Segundo elemento li (Delete)
    const deleteElement = document.createElement("li");
    deleteElement.className = "element delete";
    deleteElement.style.setProperty("--color", "#8e2a2a");

    const deleteLabel = document.createElement("label");
    deleteLabel.htmlFor = "Eliminar";
    deleteLabel.addEventListener("click", function (e) {
    
        deletedById(todo.id);
    })

    const deleteInput = document.createElement("input");
    deleteInput.type = "radio";
    deleteInput.id = "delete";
    deleteInput.name = "filed";

    const deleteIcon = document.createElement("svg");
    deleteIcon.className = "icon";
    deleteIcon.setAttribute("width", "25");
    deleteIcon.setAttribute("height", "25");

    const deleteUse = document.createElement("use");
    deleteUse.setAttribute("href", "images/icons/icons.svg#icon-trash");

    deleteIcon.appendChild(deleteUse);
    deleteLabel.appendChild(deleteInput);
    deleteLabel.appendChild(deleteIcon);
    deleteLabel.appendChild(document.createTextNode(" Delete"));
    deleteElement.appendChild(deleteLabel);

    // Ensamblar todos los elementos
    list.appendChild(renameElement);
    list.appendChild(deleteElement);
    card.appendChild(list);

    return card;
}


document.getElementById("todoForm").addEventListener("submit", function (event) {
    event.preventDefault();
    handleSave();
});
AddContainer();
initForm();
createTask();
