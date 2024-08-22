let flag = true
let updateIndex = 0

let todos = [
    {
        id: 1,
        desc: "🤙🏻 Chin Tapak Dam Dam  🤙🏻"
    },
    {
        id: 2,
        desc: "Complete 🫵🏻 Web3 assingment!!"
    },{
        id:4,
        desc: "🃏 Why did the bicycle fall over? It was two-tired from a long day of rolling through life's ups and downs! 🤡"
    },{
        id:5,
        desc: "🃏 Why don't skeletons fight each other? They don't have the guts, and they prefer a bone-dry sense of humor! 🤡"
    }

]
let numberOfTodos = todos.length

function updateButtonlabel() {
    const button = document.getElementById("btn");
    if (flag) {
        button.innerHTML = '<img src="./plus.png" alt="Button" width="10" height="10"/>';
    } else {
        button.textContent = "Update Todo";
    }
}

function addUpdate() {
    if (flag) {
        todos.push({
            id: todos.length + 1,
            desc: document.getElementById("addtodoinput").value
        })
        console.log(todos)
        renderTodos()
        // addNewTodo()
        document.getElementById("addtodoinput").value = ''; // Clear the input box
    } else {
        const todo = todos.find(todo => todo.id === updateIndex);
        todo.desc = document.getElementById("addtodoinput").value
        renderTodos()
        document.getElementById("addtodoinput").value = ''; // Clear the input box
        flag = !flag
        updateButtonlabel() // update the label 
    }

}

function updateEL(index) {
    flag = !flag
    updateIndex = index
    console.log(index)
    updateButtonlabel() // update the label 
    const oldValue = document.getElementById('todo-' + index).querySelector("span");
    console.log(oldValue)
    document.getElementById("addtodoinput").value = oldValue.innerHTML;
}

function deleteEl(index) {
    console.log(index)
    todos = todos.filter(element => element.id !== index);
    renderTodos()

}

function toggleLineThrough(checkboxId, spanId) {
    const checkbox = document.getElementById(checkboxId);
    const span = document.getElementById(spanId);
  
    if (checkbox.checked) {
      span.classList.add('line-through');
    } else {
      span.classList.remove('line-through');
    }
  }

function createToDoComponent(todo) {
    const newDivEl = document.createElement("div");
    const spanEL = document.createElement('span');
    const checkboxEl = document.createElement('input')
    const updateButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    newDivEl.setAttribute("class","todoitem")
    updateButton.setAttribute("class","update")
    deleteButton.setAttribute("class","delete")

    checkboxEl.setAttribute("type","checkbox")
    checkboxEl.setAttribute("id","checkbox-"+ todo.id)
    spanEL.setAttribute("id","span-"+ todo.id)

    updateButton.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";
    checkboxEl.onclick = ()=>{
        toggleLineThrough("checkbox-" + todo.id, "span-"+ todo.id )
    }
    updateButton.onclick = () => {
        updateEL(todo.id);
    }
    deleteButton.onclick = () => {
        deleteEl(todo.id);
    }
    spanEL.innerHTML = todo.desc

    newDivEl.id = 'todo-' + todo.id;
    newDivEl.appendChild(checkboxEl)
    newDivEl.appendChild(spanEL)
    newDivEl.appendChild(updateButton)
    newDivEl.appendChild(deleteButton)
    return newDivEl

}

function renderTodos() {
    document.getElementById("todoParent").innerHTML = "";
    for (let i = 0; i < todos.length; i++) {
        const div = createToDoComponent(todos[i]);
        document.getElementById("todoParent").appendChild(div)   
    }

}

// Initial render
renderTodos()