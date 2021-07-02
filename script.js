let ullist = document.getElementById('list');
let item = document.getElementById('item');
let addbtn = document.getElementById('addbtn');
let timedue = document.getElementById('duet');
let state = [];

document.addEventListener('DOMContentLoaded', () => {
    loadStorage();
})

document.addEventListener('click', (e) => {
    if (e.target === addbtn) {
        addItem();

    }
    else if (e.target.classList.contains('trash')) {
        removeItem(e);
    }
    else if (e.target.classList.contains('check')) {
        e.target.parentElement.parentElement.classList.toggle('done');
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
        let id = document.createTextNode(state[i].id + '   ');
        span.innerHTML = '<i class="trash fas fa-trash-alt"></i>';
        span.innerHTML += '<i class=" more bi bi-three-dots"></i>';
        span.innerHTML += '<i class="check bi bi-check-lg"></i>';

        list.appendChild(id);
        list.appendChild(title);
        list.appendChild(span);
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

    let nitem = document.createTextNode(item.value);
    let li = document.createElement('li');
    let span = document.createElement('span');
    let id = document.createTextNode(state.length + 1 + '    ')
    span.innerHTML = '<i class="trash fas fa-trash-alt"></i>';
    span.innerHTML += '<input type="checkbox"  class="completed">';
    li.appendChild(id);
    li.appendChild(nitem);
    li.appendChild(span);
    ullist.appendChild(li);
    let weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;


    let titem = {
        title: item.value,
        done: false,
        id: id.textContent,
        date: new Date().toDateString(),
        dueDate: timedue.value ? new Date(timedue.value).toDateString() : new Date(Date.now() + (6.048e+8 * 1)).toDateString()
    }
    state.push(titem);
    localStorage.setItem('todos', JSON.stringify(state));
    item.value = '';
    item.focus();
}
//code to delete item
function removeItem(e) {
    let rItem = e.target.parentElement.parentElement.innerText;
    console.log(rItem);
    let rIndex = state.findIndex(element => element.title == rItem);
    console.log(rIndex);
    state.splice(rIndex, 1);
    localStorage.setItem('todos', JSON.stringify(state));
    location.reload();

}