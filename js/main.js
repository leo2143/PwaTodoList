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

let allTodoList = [];

// Llamar a createTask con un objeto válido, no la lista completa
document.addEventListener('DOMContentLoaded', () => {
    let storedTodos = localStorage.getItem('allTodoList');
    if (storedTodos) {
        allTodoList = JSON.parse(storedTodos).map(todo =>
            new TodoModel(todo.id, todo.title, todo.description, todo.check, todo.date)
        );
        buildTodoLists(); // reconstruir la interfaz
    } else {
        // Si no hay datos en localStorage, crear tareas predeterminadas (solo ejemplo)
        allTodoList = [
            new TodoModel(1, "Estudiar JavaScript", "Estudiar para el examen de JavaScript", false, "2025-05-01"),
            new TodoModel(2, "Estudiar CSS", "Estudiar para el examen de CSS", false, "2025-05-02")
        ];
        updateStorage(); // Guarda las tareas predeterminadas
    }

});

// Cada vez que modifiques allTodoList
function updateStorage() {
    localStorage.setItem('allTodoList', JSON.stringify(allTodoList));
}


const AllTodoPending = [];

const AllTodoCompleted = [];




const container = document.getElementById("section-todo")

//funcion para recorrer la lista general de todo y discriminar por si esta completado o no y añadirlo a su respectiva lista
function initializeTodoLists(allTodoList) {
    allTodoList.forEach(todo => {
        if (!todo.check) {

            AllTodoPending.push(todo);
        } else {
            AllTodoCompleted.push(todo);
        }
    });
}
//funcion para crear los todo
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

        let h2Pending = document.createElement("h3");
        h2Pending.textContent = "Tareas por hacer";

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
        todoCompleted.className = " d-flex flex-column gap-5"

        let h2Completed = document.createElement("h3");
        h2Completed.textContent = "Tareas Completadas";
        todoCompletedContainer.appendChild(h2Completed);


        AllTodoCompleted.forEach(todo => {
            todoCompleted.appendChild(buildTodoCompleteds(todo));
        });
        todoCompletedContainer.appendChild(todoCompleted);
        container.appendChild(todoCompletedContainer);
    }
}

//funcion para crear en el dom el contenedor de los todos no completados
function buildTodos(todo) {

    let todoContainer = document.createElement("div");
    todoContainer.className = "todo-container d-flex flex-column flex-md-row justify-content-between p-4 align-items-center border border-3 border-secondary-dark rounded-4 gap-4 mt-3 ";
    todoContainer.addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        constructAndShowTodoModal(todo)
    })
    todoContainer.appendChild(buildTodoCheckAndTitle(todo));
    todoContainer.appendChild(buildDateIconAndDateText(todo));
    return todoContainer;
}
//funcion para crear en el dom los todo completados
function buildTodoCompleteds(todo) {
    let todoContainer = document.createElement("div");
    todoContainer.className = "todo-completed-container d-flex flex-column flex-md-row justify-content-between p-4 align-items-center border border-3 border-secondary-dark rounded-4 mt-3 gap-4";
    todoContainer.addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        constructAndShowTodoModal(todo)
    })
    todoContainer.appendChild(buildTodoCheckAndTitle(todo));
    todoContainer.appendChild(buildDateIconAndDateText(todo));
    return todoContainer;

}

//funcion para crear en el dom el titulo del todo y el check input
function buildTodoCheckAndTitle(todo) {

    //contuctor de check y titulo
    let checkAndTitleContainer = document.createElement("div");
    checkAndTitleContainer.className = "check-and-title-container d-flex gap-2 align-items-center";


    let checkWrapper = document.createElement("div");
    checkWrapper.className = "checkbox-wrapper";

    let input = document.createElement("input");
    input.type = "checkbox";
    input.checked = todo.check;
    input.onclick = function (e) {
        e.stopPropagation();
        todo.check = input.checked;
        updateStorage();
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


    let title = document.createElement("h4");
    title.className = "d-block m-0";
    checkAndTitleContainer.appendChild(checkWrapper);
    title.textContent = todo.title;
    checkAndTitleContainer.appendChild(title);

    return checkAndTitleContainer;

}
//funcion para crear en el dom el icono de fecha y el texto de fecha
function buildDateIconAndDateText(todo) {
    let dateIconAndDateTextContainer = document.createElement("div");
    dateIconAndDateTextContainer.className = "dateIcon-and-dateText-Container d-flex align-items-center gap-2 justify-content-between position-relative";

    // Contenedor para el icono de fecha y texto
    let dateContent = document.createElement("div");
    dateContent.className = "d-flex align-items-center gap-2";

    let dateIcon = document.createElement("img");
    dateIcon.src = "images/icons/calendar-24.svg";
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

    // Botón de tres puntos usando el sprite SVG (no pude hacerlo funcionar por document.createElement)
    let dotsButton = document.createElement("button");
    dotsButton.className = "btn btn-link p-0 dots-button";
    dotsButton.innerHTML = `
        <svg class="dots-icon" width="24" height="24">
            <use href="images/icons/icons.svg#icon-dots"></use>
        </svg>
    `;

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

            if (!menuContainer.hasChildNodes()) {
                const menu = buildCardMenu(todo);
                menu.style.minWidth = "180px";
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
//funcion para limpiar la lista de todo checkeado y deschekeado
function cleanSections() {
    container.innerHTML = "";
    AllTodoCompleted.length = 0;;
    AllTodoPending.length = 0;;
}
//funcion para buscar el todo por id
function findTodoById(todo) {
    return allTodoList.find(todo => todo.id === todoIdToFind);

}
//funcion que permite cerrar el modal
function closeModal() {
    const modalElement = document.getElementById("exampleModal");
    const modalInstance = bootstrap.Modal.getInstance(modalElement)
        || new bootstrap.Modal(modalElement);
    modalInstance.hide();
}

//funcion que se encarga de eliminar un todo por id
function deletedById(todoId) {
    let index = allTodoList.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
        allTodoList.splice(index, 1);
    }
    buildTodoLists();
    updateStorage();

}

//funcion que se encarga de crear un todo 
function createTask(todo) {

    const maxId = allTodoList.reduce((max, todo) => {
        return todo.id > max ? todo.id : max;
    }, 0);
    if (maxId != 0) {
        allTodoList.push(new TodoModel(maxId + 1, todo.title, todo.description, false, todo.date));
        closeModal();
        cleanSections();
        buildTodoLists();
        updateStorage();
    }
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
    updateStorage();

}

//funcion que se encarga de renderizar los datos 
// seleccionados y impactar el cambio en un mismo objeto    
function toogleModal(todo, isEdit) {

    const modalElement = document.getElementById('exampleModal');
    const myModal = bootstrap.Modal.getOrCreateInstance(modalElement);
    const form = document.getElementById("todoForm");

    // Cambiar el título del modal para edición
    if (isEdit) {
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

function AddContainer() {
    addContain = document.getElementById("add-container");
    console.log("here")
    addContain.addEventListener("click", function (e) {
        toogleModal(null, false);
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
    const isEdit = form.dataset.editId;

    if (isEdit) {
        // Lógica para actualizar
        updateTask(todoData, form);
    } else {
        // Lógica para crear nuevo
        createTask(todoData, form);
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
        toogleModal(todo, true);
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
    deleteLabel.appendChild(document.createTextNode("Eliminar"));
    deleteElement.appendChild(deleteLabel);

    // Ensamblar todos los elementos
    list.appendChild(renameElement);
    list.appendChild(deleteElement);
    card.appendChild(list);

    return card;
}

//funcion para crear en el dom el modal que muestra la informacion del todo
function constructAndShowTodoModal(todo) {
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "viewContent";
    modal.tabIndex = -1;
    modal.setAttribute("aria-labelledby", "viewContent");
    modal.setAttribute("aria-hidden", "true");

    const dialog = document.createElement("div");
    dialog.className = "modal-dialog modal-dialog-centered";

    const content = document.createElement("div");
    content.className = "modal-content";

    const header = document.createElement("div");
    header.className = "modal-header";

    const headerText = document.createElement("div");
    headerText.className = "d-flex flex-column align-items-start justify-content-between";

    const title = document.createElement("h5");
    title.className = "modal-title";
    title.id = "view";
    title.textContent = todo.title || "Sin título";

    const date = document.createElement("p");
    date.className = "d-block m-0 fw-light";
    date.textContent = todo.date || "Sin fecha";

    headerText.appendChild(title);
    headerText.appendChild(date);

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "btn-close";
    closeBtn.setAttribute("data-bs-dismiss", "modal");
    closeBtn.setAttribute("aria-label", "Close");

    header.appendChild(headerText);
    header.appendChild(closeBtn);

    const body = document.createElement("div");
    body.className = "modal-body";

    const description = document.createElement("p");
    description.textContent = todo.description || "Sin descripción";

    body.appendChild(description);

    content.appendChild(header);
    content.appendChild(body);
    dialog.appendChild(content);
    modal.appendChild(dialog);

    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    modal.addEventListener("hidden.bs.modal", () => {
        modal.remove();
    });
}
//funcion para añadir al boton la funcionalidad de crear la tarea

document.getElementById("todoForm").addEventListener("submit", function (event) {
    event.preventDefault();
    handleSave();
});

//aplicar el service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registrado con éxito:', reg))
            .catch(err => console.log('Error al registrar el Service Worker:', err));
    });
}
AddContainer();
buildTodoLists();

