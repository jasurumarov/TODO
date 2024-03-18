const form = document.querySelector(".form")
const input = document.querySelector("#todo")
const tasks = document.querySelector(".tasks")
const checkbox = document.querySelector(".checkbox")
const checkContainer = document.querySelector(".check-container")

let now = new Date()
let id = 1230

const DATA = []

form.addEventListener("submit", (e) => {
    e.preventDefault()
    id++
    let newTask = {
        id: String(id),
        text: input.value,
        time: `${now.getHours() < 10 ? "0" + now.getHours() : now.getHours()} : ${now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()}`,
        valid: checkbox.checked
        
    }
    DATA.push(newTask)
    input.value = ""
    saveData()
    taskCreator(DATA)
})

function taskCreator(data) {
    while (tasks.firstChild) {
        tasks.firstChild.remove();
    }
    data.forEach((el, i) => {
        let task = document.createElement("div");
        task.classList.add("task");
        now = new Date();
        const checkedClass = el.valid ? "checked" : "";
        task.innerHTML = `
        <span class="check-container">
            <input class="checkbox" type="checkbox" ${el.valid ? "checked" : ""}>
            <p class="${checkedClass}">${el.text}</p>
        </span>
        <article>
            <p>${el.time}</p>
            <button onclick="deleteTask(${i})" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="fill: #1266f1;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
            </button>
        </article>
        `;
        tasks.appendChild(task);

        const checkbox = task.querySelector(".checkbox");
        checkbox.addEventListener("change", function() {
        
        const taskText = task.querySelector("p");
        taskText.classList.toggle("checked");
        DATA[i].valid = checkbox.checked;
        saveData()
        });
    });
}

taskCreator(DATA)

function deleteTask(index) {
    DATA.splice(index, 1)
    taskCreator(DATA)
    saveData()
}

function saveData() {
    localStorage.setItem("data", JSON.stringify(DATA));
}

function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        DATA.length = 0; 
        parsedData.forEach(item => {
            DATA.push(item);
        });
        taskCreator(DATA);
    }
}

showTask()

const names = ['Jasur', 'Aziz', 'Sardor']
let getNames = JSON.parse(localStorage.getItem("names"))