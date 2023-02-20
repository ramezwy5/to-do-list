
var addedList = $("#list"); //ul list element
var itemAdded = $("#input"); // input field
const submitBtn = $(".submit"); // submit button (+).
const reset = $('#reset'); // reset button.
//const showList = $(".list"); // the div contains ul list element for style

//need a list of tasks has id for each task.
let tasksList = [];

//  update tasksList with localStorage
if(localStorage.getItem("tasksArr")){
    tasksList = JSON.parse(localStorage.getItem("tasksArr"))
}
getLS();


// submit event listeners.

//submit button
submitBtn.on("click", function(){
        addToList();
    });
// Enter key
$("body").keydown(function(event){
    if(event.key === "Enter"){
        addToList();
    }
});



// rest button
reset.on("click", () => {window.localStorage.clear(); tasksList = []; $(".task").remove()});

// focus on input
window.onload = () => itemAdded.focus();

// create object for tasks has id and text.
function addToList(){
    if(itemAdded.val() !== ""){
        let taskObj = {id: Date.now(), text: itemAdded.val(), complete: null};
        tasksList.push(taskObj); // add object to tasksList        
        taskItem(taskObj.text);
        itemAdded.val("");
        saveToLS(tasksList);
    }
}    
// creating element for task in task list

function taskItem(taskAdd){
   addedList.append(`<li class="task">${taskAdd}</li>`);
   $(".task").css("cursor", "pointer");
    
    // complete task
    $("li.task").on("click",function (){
        $(this).addClass("complete");
        addToList.taskObj["complete"] = true;
    })
}

function saveToLS(tasks){
    window.localStorage.setItem("tasksArr", JSON.stringify(tasks));
}

function getLS(){
    let data = window.localStorage.getItem("tasksArr");
    if(data){
        let localTasks = JSON.parse(data);
        localTasks.forEach(t => {
            taskItem(t.text);
        });
    }
}
