const inputAddNote = document.querySelector('input');
const form = document.querySelector('#form-note');
const list = document.querySelector('ul.collection');
const multiDeleteBtn = document.querySelector('.delete_btn');
const inputSerachNote = document.querySelector('.serachNote');

invokeAllFunction();

function invokeAllFunction() {
    document.addEventListener('DOMContentLoaded', getNotes);
    form.addEventListener('submit', addNote);
    list.addEventListener('click', removeNote);
    multiDeleteBtn.addEventListener('click', removeAllNote);
    inputSerachNote.addEventListener('keyup', filterNote);
}

function addNote(e) {
    e.preventDefault();
    if (inputAddNote.value === '') {
        alert('یه یادداشت وارد کن');
    } else {
        let li = document.createElement('li');
        li.className = 'collection-item';
        let link = document.createElement('a');
        link.className = 'secondary-content left delete_btn_color';
        link.innerHTML = '<i class="material-icons">delete_forever</i>';
        li.append(document.createTextNode(inputAddNote.value), link);
        list.append(li);
        storeInLocalStorage(inputAddNote.value);
        inputAddNote.value = '';
        inputAddNote.focus();
    }
}

function removeNote(e) {
    if (e.target.parentElement.classList.contains('delete_btn_color')) {
        if (confirm('آیا مطمئن هستی ؟')) {
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement.childNodes[0]['data']);

        }
    }
}

function removeAllNote() {
    if(confirm('با این کار همه یادداشت هات پاک میشه! \n مطمئنی ؟؟')){
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        clearLocalStorage();
        inputAddNote.focus();
    }
}
function filterNote() {
    let text = inputSerachNote.value;
    document.querySelectorAll('.collection-item').forEach((task) => {
        let content = task.textContent;
        if (content.indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function storeInLocalStorage(note) {
    let notes;
    if (localStorage.getItem('notes') === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('notes'));
    }
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
    let notes;
    if (localStorage.getItem('notes') === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('notes'));
    }
    notes.forEach((note) => {
        let li = document.createElement('li');
        li.className = 'collection-item';
        let link = document.createElement('a');
        link.className = 'secondary-content left delete_btn_color';
        link.innerHTML = '<i class="material-icons">delete_forever</i>';
        li.append(document.createTextNode(note), link);
        list.append(li);
    });
}

function removeTaskFromLocalStorage(singleNote) {
    let notes;
    if (localStorage.getItem('notes') === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('notes'));
    }
    notes.forEach((note, index) => {
        if (singleNote === note) {
            notes.splice(index, 1);
        }
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function clearLocalStorage() {
    localStorage.clear()
}