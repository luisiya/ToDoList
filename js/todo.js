(function toDoList() {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const date = document.querySelector("#date");
    date.innerText = today + " " + time;
    const body = document.querySelector("body");
    let taskIdOnServer;

    body.addEventListener('click', function remove(event) {
        let rowId = event.target.parentNode.parentNode.id;
        if (event.target.tagName === "BUTTON" && event.target.id !== "addInput") {
            let btn = document.querySelector(`#${rowId} button`);
            let task = document.querySelector(`#${rowId} .todayTask`);

            task.innerText = document.querySelector(`#${rowId} input`).value;
            if (task.innerHTML !== "") {
                postTaskToServer(task);
                btn.style.backgroundColor = "grey";
            }
        }
        if (event.target.id === "addInput") {
            addNewTaskRow();
        }
        if (event.target.className === "checked") {
            let rowId = event.target.parentNode.parentNode.id;
            let task = document.querySelector(`#${rowId} .todayTask`);
            if (task.innerText !== "" && task.getAttribute("data")) {

                let rowId = event.target.parentNode.parentNode.id;
                let btn = document.querySelector(`#${rowId} button`);
                let task = document.querySelector(`#${rowId} .todayTask`);
                putTaskAsDone(task.getAttribute("data"));
                let checked = document.querySelector(`#${rowId} .checked`);
                checked.style.filter = "none";
                task.style.backgroundColor = "#b2dfdb";
                btn.innerText = "DONE";
                btn.style.backgroundColor = "#b2dfdb";
            }
        }
    });
    let lastRowId = 0;

    function addNewTaskRow() {
        let main = document.getElementById("listOfTasks");
        let str = `<div class="row" id="row${++lastRowId}"><div class="input-field col s3"><input type="text" class="validate"><label class="active">Main tasks</label></div><div class="col s3"><button class="btn submitBtn waves-effect waves-light" id="addBtn">Add &#8594</button></div><div class="chip col s4 todayTask"></div><i class="close material-icons"><img src="img/checked.png"  class="checked"></i></div>`;
        main.insertAdjacentHTML('beforeend', str);
        document.querySelector(`#row${lastRowId} .validate`).focus();
        return addNewTaskRow;
    };
    const postTaskToServer = async (task) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                date: today,
                body: task.innerHTML,
                time: time
            }),

        });
        const json = await response.json();
        taskIdOnServer = json.id;
        task.setAttribute("Data", taskIdOnServer);
    };

    function putTaskAsDone(taskId) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({
                status: "done"
            }),
        })
            .then(response => response.json())
            .then(json =>
                console.log(json)
            )
    }
    addNewTaskRow()()();
})();
