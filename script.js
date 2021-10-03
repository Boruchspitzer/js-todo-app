let ullist = document.getElementById('list');
let item = document.getElementById('item');
let addbtn = document.getElementById('addbtn');
let timedue = document.getElementById('duet');
let priority = document.getElementById('priority');
let state = [];
let httpRequest = new XMLHttpRequest();


document.addEventListener('DOMContentLoaded', () => {
    loadStorage();
    let today = new Date().getTime();
    console.log('today is ', today);
    console.log(state);
    let ditems = state.filter(ditem => new Date().getTime(item.dueDate) < today)
    console.log(`ditems is ${ditems}`);
    console.log('date', new Date(state[1].dueDate));
})

document.addEventListener('click', (e) => {
    if (e.target === addbtn || e.target.witch === 13) {
        addItem();

    }
    else if (e.target.classList.contains('trash')) {
        removeItem(e);
    }
    else if (e.target.classList.contains('check')) {
        checkHandler(e);
    }
    else if (e.target.classList.contains('more')) {
        let selected = e.target.parentElement.parentElement.id;
        let options = state.filter((todo) => { return todo.id == selected });
        window.alert(`created on ${options[0].date}\nshould be done by ${options[0].dueDate}`);
    }
    else if (e.target.classList.contains('exiter')) {
        window.close();
    }


})

//code to load content from localstorage
function loadStorage() {
    if (localStorage.getItem('todos'))
        state = JSON.parse(localStorage.getItem('todos'));
    for (let i = 0; i < state.length; i++) {
        let title = document.createTextNode(state[i].title);
        let list = document.createElement('li');
        let span = document.createElement('span');
        span.innerHTML = '<i class="trash fas fa-trash-alt"></i>';
        span.innerHTML += '<i class=" more bi bi-three-dots"></i>';
        span.innerHTML += '<i class="check bi bi-check-lg"></i>';

        list.appendChild(title);
        list.appendChild(span);
        list.setAttribute('data-title', "DUE ON: " + state[i].dueDate + '\nCREATED ON: ' + state[i].date);
        list.className = state[i].done ? 'done' : '';
        list.id = state[i].id;
        ullist.appendChild(list);
    }

    item.focus();

}
//code to add new item
function addItem() {
    if (item.value == "") {
        window.alert('nothing to add!!');
        item.focus();
        return;
    }
    // let nitem = document.createTextNode(item.value);
    // let li = document.createElement('li');
    // let span = document.createElement('span');
    // span.innerHTML = '<i class="trash fas fa-trash-alt"></i>';
    // span.innerHTML += '<i class=" more bi bi-three-dots"></i>';
    // span.innerHTML += '<span class="popuptext" id="myPopup"></span>';
    // span.innerHTML += '<i class="check bi bi-check-lg"></i>';
    // li.appendChild(nitem);
    // li.appendChild(span);
    // ullist.appendChild(li);
    let weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    let titem = {
        title: item.value,
        category: priority.value,
        done: false,
        id: Date.now(),
        date: new Date().toDateString(),
        dueDate: timedue.value ? new Date(timedue.value).toDateString() : new Date(Date.now() + weekInMilliseconds).toDateString()
    }
    state.push(titem);
    localStorage.setItem('todos', JSON.stringify(state));
    item.value = '';
    location.reload();
    item.focus();
}
//code to delete item
function removeItem(e) {
    let rItem = e.target.parentElement.parentElement.id;
    console.log(rItem);
    let rIndex = state.findIndex((element) => element.id == rItem);
    console.log(rIndex);
    state.splice(rIndex, 1);
    localStorage.setItem('todos', JSON.stringify(state));
    location.reload();
}
//code to respond to check click
function checkHandler(e) {
    e.target.parentElement.parentElement.classList.toggle('done');
    let dItem = e.target.parentElement.parentElement.id;
    let dIndex = state.findIndex((element) => element.id == dItem);
    state[dIndex].done = e.target.parentElement.parentElement.classList.contains('done') ? true : false;
    state.sort(function (a, b) {
        let classA = a.done;
        let classB = b.done;
        if (classA > classB) { return 1 }
        if (classA < classB) { return -1 }
        return 0;
    })
    localStorage.setItem('todos', JSON.stringify(state));
    location.reload();

}