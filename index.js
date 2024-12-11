

let taskarray=[]
function addTasktoDOM(task,taskarray){
    taskarray.push(task)
    let list=document.getElementById('taskList')
    let listitem=document.createElement('li')
    listitem.innerHTML=task //task will be a trimmmed string
    list.appendChild(listitem)

    let deletebutton=document.createElement('button')
    deletebutton.innerHTML="Delete Task"
    listitem.appendChild(deletebutton)

    deletebutton.addEventListener('click',()=>{
        let parent=deletebutton.parentElement
        //now parent has the text and then the delete button also so ,a text node and element node ,we want the text node ka textcontent
        let val=parent.firstChild.textContent
        let index = taskarray.indexOf(val); // Find the index of the task
        if (index !== -1) {
            taskarray.splice(index, 1); // Remove the task from the array
        }
        localStorage.setItem('tasks',JSON.stringify(taskarray))// on deleting the task also the local storage should be updated
        parent.remove()
    })

    localStorage.setItem('tasks',JSON.stringify(taskarray))
}

s=new Set() //to avoid repetition of tasks by user
let button=document.getElementById('addTaskButton')
button.addEventListener('click',()=>{
    let input=document.getElementById('taskInput').value.trim()
    if(input && !s.has(input)){
        addTasktoDOM(input,taskarray)
        s.add(input)
        document.getElementById('taskInput').value=""
    }
    else if(s.has(input))alert("Kindly enter a new task")
    else alert("Kindly enter a task")
})

//whenever we reload the dom the task array,list items,deletebuttons all will vanish everything will be vanished but we can access the tasks from the local storage and add it to the DOM

document.addEventListener('DOMContentLoaded',()=>{
    let tasks=JSON.parse(localStorage.getItem('tasks')) || [] //parse the JSON string and convert it into a array
    for(task of tasks){
        addTasktoDOM(task,taskarray)
    }
})

