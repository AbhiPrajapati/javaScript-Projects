
const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clrbtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


loadEventListner();


function loadEventListner()
{
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    tasklist.addEventListener('click', removeItem);
    clrbtn.addEventListener('click',cleartasks);
    filter.addEventListener('keyup',filterTasks);
}

function getTasks()
{
      if(localStorage.getItem('tasks') == null)
    {
       tasks = [];
    }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
      const li = document.createElement('li');
            li.className = "container-item";
            li.appendChild(document.createTextNode(task));
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove"></i>';

            li.appendChild(link);
            tasklist.appendChild(li);
    });

    

}

function addTask(e)
{
   if(taskInput.value === '')
   {
       alert('value is required');
   }else{
            const li = document.createElement('li');
            li.className = "container-item";
            li.appendChild(document.createTextNode(taskInput.value));
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove"></i>';

            li.appendChild(link);
            tasklist.appendChild(li);
            storetasksInLocalStorage(taskInput.value);

            taskInput.value = '';
   }

   //creating list

 


    e.preventDefault();
}

function storetasksInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks') == null)
    {
       tasks = [];
    }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//remove Item Event Delegation

function removeItem(e)
{
   if(e.target.parentElement.classList.contains('delete-item'))
   {
       //going in upward direction and swithching to parent element of <i>-><a>-><li>
       if(confirm("Are you Sure?"))
       {
            e.target.parentElement.parentElement.remove();
             removetasksInLocalStorage(e.target.parentElement.parentElement);
       }
      
   }
}

function removetasksInLocalStorage(taskItem)
{
     let tasks;
    if(localStorage.getItem('tasks') == null)
    {
       tasks = [];
    }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index , 1)
        }
    });
     localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Clear all Tasks

function cleartasks()
{
    //Two Methods

    //tasklist.innerHTML = '';
    //faster Way 
    while(tasklist.firstChild)
    {
        tasklist.removeChild(tasklist.firstChild);
    }

    clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage()
{
    localStorage.clear();
}
function filterTasks(e)
{
   const text = e.target.value.toLowerCase();
   

   document.querySelectorAll('.container-item').forEach(
       function(tasks){
       const item = tasks.firstChild.textContent;
       if(item.toLowerCase().indexOf(text) != -1)
       {
           tasks.style.display = "block";
       }
       else{
           tasks.style.display = "none";
       }
   });
}