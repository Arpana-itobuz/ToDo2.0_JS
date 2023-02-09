const plusButton = document.getElementById("plusButton");
const input = document.getElementById("inputBox");
const inputValue = document.getElementById("inputValue");
const trash = document.getElementById("trash");
const check = document.getElementById("check");
const inputContent = document.getElementById("inputContent");
const destination = document.getElementById("destination"); 
const clearAllButton=document.getElementById("clearAllButton")

let taskArray = [];

const add = () => {
  if (!input.value.trim().length) {
    alert("This field is required!!");
  } else {
    const object = {
      text: input.value,
      completed: false,
      id: Date.now(),
    };
    taskArray.push(object);

    destination.innerHTML += `
    <div class="inputContent" data-id=${object.id} id="inputContent">
    <span class="inputValue" id="inputValue">
    ${object.text}
    </span>
    <button class="checkButton" id="check" data-id=${object.id}>
      <i class="fas fa-solid fa-check"></i>
    </button>
    <button class="trashButton" id="trash" data-id=${object.id}>
      <i class="fas fa-solid fa-trash"></i>
    </button>
    </div> 
    `;
    input.value = "";
  }
};

destination.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.classList.contains("fa-check")) {
    let key = e.target.parentElement.parentElement.dataset.id;

    let index = taskArray.findIndex(() => Number(key));

    taskArray[index].completed = true;

    e.target.parentElement.parentElement.classList.add("completed");
  }
  if (e.target.classList.contains("fa-trash")) {
    let key = e.target.parentElement.parentElement.dataset.id;
    let index = taskArray.findIndex(() => Number(key));
    taskArray.splice(index, 1);
    e.target.parentElement.parentElement.remove();
  }
});

allButton.addEventListener("click", () => {
  let task = document.querySelectorAll(".inputContent");
  for (let i = 0; i < task.length; i++) {
    task[i].style.display = "flex";
  }
});

activeButton.addEventListener("click", () => {
  let task = document.querySelectorAll(".inputContent");
  for (let i = 0; i < task.length; i++) {
    if (task[i].classList.contains("completed")) {
      task[i].style.display = "none";
    } else {
      task[i].style.display = "flex";
    }
  }
});

completedButton.addEventListener("click", () => {
  let task = document.querySelectorAll(".inputContent");

  for (let i = 0; i < task.length; i++) {
    if (task[i].classList.contains("completed")) {
      task[i].style.display = "flex";
    } else {
      task[i].style.display = "none";
    }
  }
});

clearButton.addEventListener("click", () => {
  let task = document.querySelectorAll(".inputContent");
  for (let i = 0; i < task.length; i++) {
    if (task[i].classList.contains("completed")) {
      let id = task[i].dataset.id;
      task[i].remove();
      let index = taskArray.findIndex(() => Number(id));
      taskArray.splice(index, 1);
    }
  }
});

clearAllButton.onclick = function (){
    destination.innerHTML="";
    taskArray = []
}

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    add();
  }
});

plusButton.addEventListener("click", (e) => {
  add();
});

let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Return Back";
});

window.addEventListener("focus", () => {
  document.title = docTitle;
});
