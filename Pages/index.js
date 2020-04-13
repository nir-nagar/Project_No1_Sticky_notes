
const NOTES_DOM = {
    userTextInput: document.getElementById('userTextInput'),
    userTimeInput: document.getElementById('userTimeInput'),
    userDateInput: document.getElementById('userDateInput'),

    myNotes: document.getElementById('myNotes')
}

let notesArray = [];
let ifSaveNoteButtonDown = 0;

function saveNote() {
    ifSaveNoteButtonDown = 1;

    const { userTextInput,
        userTimeInput,
        userDateInput } = NOTES_DOM

    if (allInputEmpty())
        return;

    notesArray.push(new Note(userTextInput.value, userTimeInput.value, userDateInput.value));

    saveArrayToLocalStorage();

    draw(notesArray);
}

function resetInput() {
    const { userTextInput,
        userTimeInput,
        userDateInput } = NOTES_DOM;

    userTextInput.value = "";
    userTimeInput.value = "";
    userDateInput.value = "";
}

function allInputEmpty() {

    const { userTextInput,
        userTimeInput,
        userDateInput } = NOTES_DOM

    if ((userTextInput.value === "") ||
        (userTimeInput.value === "") ||
        (userDateInput.value === "")) {
        alert("Please Fill All Input");
        return true;
    }
    return false;

}

function saveArrayToLocalStorage() {

    localStorage.setItem("localStorageAryNotes", JSON.stringify(notesArray));

}

function draw(ary) {

    const { myNotes } = NOTES_DOM
    myNotes.innerHTML = "";

    for (let index = 0; index < ary.length; index++) {
        drawNote(ary[index], index)
    }
}

function drawNote(note, index) {

    const { myNotes } = NOTES_DOM;
    const newNote = createNewNote(note, index)

    if (!newNote) return;

    myNotes.append(newNote);
}

function createNewNote(note, index) {

    const { id,
        userTextInput,
        userTimeInput,
        userDateInput,
        isNoteDone } = note;



    let tempNote = document.createElement("div");


    if (ifSaveNoteButtonDown && ((index + 1) === notesArray.length)) {
        tempNote.className = " card  cardStyle noteCardStyle " + randomFadeInStyle();
        ifSaveNoteButtonDown = 0;
    } else {
        tempNote.className = " card  cardStyle noteCardStyle ";

    }

    tempNote.id = id;
    tempNote.style = "opacity : 1; background-Color : rgba(0, 0, 0, 0)";

    if (isNoteDone === 1) {
        tempNote.style = "opacity : 0.4; background-Color : rgba(0, 0, 0, 0)";
    }

    let tempNoteBody = document.createElement("div");
    tempNoteBody.className = "titleStyle";
    tempNoteBody.innerHTML = userTextInput;


    let tempNoteDate = document.createElement("h6");
    tempNoteDate.className = "dateStyle styleNo1";
    tempNoteDate.innerText = userDateInput;

    let tempNoteTime = document.createElement("h6");
    tempNoteTime.className = "timeStyle styleNo1";
    tempNoteTime.innerText = userTimeInput;

    let tempDeleteButton = document.createElement("span");
    tempDeleteButton.className = " deleteButtonStyle glyphicon-remove-sign";
    tempDeleteButton.addEventListener('click', deleteNote)


    let doneNoteButton = document.createElement("span");
    doneNoteButton.className = " doneButtonStyle  glyphicon-check ";
    doneNoteButton.addEventListener('click', doneNote)


    tempNote.addEventListener('mouseenter', visibilityButtonOn)
    tempNote.addEventListener('mouseleave', visibilityButtonOff)


    tempNote.appendChild(tempNoteBody);
    tempNote.appendChild(tempNoteDate);
    tempNote.appendChild(tempNoteTime);
    tempNote.appendChild(tempDeleteButton);
    tempNote.appendChild(doneNoteButton);


    return tempNote;
}

function visibilityButtonOn() {
    this.querySelector(".deleteButtonStyle").style.visibility = 'visible';
    this.querySelector(".doneButtonStyle").style.visibility = 'visible';


}

function visibilityButtonOff() {
    this.querySelector(".deleteButtonStyle").style.visibility = 'hidden';
    this.querySelector(".doneButtonStyle").style.visibility = 'hidden';

}

function doneNote() {

    const index = findNoteIndex(this.parentElement.id);
    if (notesArray[index].isNoteDone === 1)
        notesArray[index].isNoteDone = 0;
    else
        notesArray[index].isNoteDone = 1;

    saveArrayToLocalStorage();
    draw(notesArray)
}

function randomFadeInStyle() {

    let caseFadeInAry = ['fadeInStyleTop',
        'fadeInStyleBottom',
        'fadeInStyleLeft',
        'fadeInStyleRight',
        'fadeInStyleZoom'];

    return caseFadeInAry[`${Math.round(Math.random() * caseFadeInAry.length)}`]
}

function deleteNote() {

    const index = findNoteIndex(this.parentElement.id);
    notesArray.splice(index, 1);
    saveArrayToLocalStorage();
    draw(notesArray)
}

function findNoteIndex(id) {

    for (let index = 0; index < notesArray.length; index++) {
        if (notesArray[index].id === id) {
            return index
        }
    }
}

function Note(
    _userTextInput,
    _userTimeInput,
    _userDateInput) {

    this.id = `note_${Math.round(Math.random() * 999)}`;
    this.userTextInput = _userTextInput;
    this.userTimeInput = _userTimeInput;
    this.userDateInput = _userDateInput;
    this.isNoteDone = 0;
}

function init() {
    let checkLocalStorage = localStorage.getItem(("localStorageAryNotes"));

    if (checkLocalStorage != null) {
        notesArray = JSON.parse(checkLocalStorage)

    }
    draw(notesArray);
}



function showAllNotes() {
    draw(notesArray)
}

function showNotesToDo() {

    const toDoArrayNote = notesArray.filter((note) => {
        if (note.isNoteDone === 0)
            return note
    })

    draw(toDoArrayNote)
}



function showDoneNotes() {

    const toDoArrayNote = notesArray.filter((note) => {
        if (note.isNoteDone === 1)
            return note
    })

    draw(toDoArrayNote)
}


init()