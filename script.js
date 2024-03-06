const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    let dueDate = document.getElementById("due-date");
    let feedback = document.getElementById("feedback");

    if(inputBox.value == '') {
        feedback.textContent = "You must write something!";
        setTimeout(() => feedback.textContent = '', 3000);
    }
    else {
        feedback.textContent = '';
        let li = document.createElement("li");
        let taskText = inputBox.value; 
        let formattedDate = formatDate(dueDate.value); 

        let textContainer = document.createElement("div");
        textContainer.classList.add("text-container");
        textContainer.innerHTML = `${taskText} <span class="due-label"></span><span class="due-date">${formattedDate}</span>`;

        li.appendChild(textContainer);
        
        let span = document.createElement("span");
        span.className = "delete-btn";
        span.innerHTML = "\u00D7";
        li.appendChild(span);

        listContainer.appendChild(li);
    }
    inputBox.value = "";
    dueDate.value = "";
    saveData();
}

function formatDate(dateString) {
    let date = new Date(dateString);
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2); 

    return `${month}/${day}`;
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.className === "delete-btn") { 
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();