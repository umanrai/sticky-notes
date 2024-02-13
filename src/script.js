const notesConatiner = document.getElementById("app");
const addNoteButton = notesConatiner.querySelector(".add-note");
const noteCollection = document.querySelector(".note");

showNotes()

function showNotes() {
    getNotes().forEach((note) => {
        // console.log(note, typeof note)
        const noteElement = createNoteElement(note.id, note.content);
        notesConatiner.insertBefore(noteElement, addNoteButton.nextSibling);
        
        noteElement.focus();
    })

    showTotalCount()
}

addNoteButton.addEventListener("click", () => addNote());

/**
 * Notes form local storage
 * 
 * @returns object
 */
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    resetAutoFocus()

    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";
    element.autofocus = true;

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });
    
    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you wish to delete this sticky note?");
        console.log(doDelete);

        if (doDelete) {
            deleteNote(id, element)
        }
    });
    
    return element;
}

function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesConatiner.insertBefore(noteElement, addNoteButton.nextSibling);
    noteElement.focus();
    notes.push(noteObject);
    saveNotes(notes);

    showTotalCount();
}

function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id); // €Short arrow function

    // const notes = getNotes().filter(function (note) {
    //     return  note.id != id;
    // });

    saveNotes(notes);
    notesConatiner.removeChild(element);
    showTotalCount();
}

document.addEventListener('keydown', function(event) {

    if (event.ctrlKey && event.altKey && event.code == "KeyN") {
        // Call the addNote() function
        addNote();
    }

    if (event.ctrlKey && event.key === 'Delete') {
        saveNotes([]);
        document.querySelectorAll(".note").forEach(function (note) {
            note.remove()
        })
 
        showTotalCount();
    }
    
});

function resetAutoFocus()
{
    var noteCollection = document.querySelectorAll(".note");

    if (noteCollection && noteCollection.length > 0) {
        noteCollection.forEach(note => {
            note.autofocus = false;
        });
    }
}

document.querySelector('.search').addEventListener('keyup', function(event) {

    var searchTerm = event.target.value;

    if (searchTerm.length > 3) {

        searchTerm = searchTerm.toLowerCase();

        var noteCollection = document.querySelectorAll(".note");

        if (noteCollection && noteCollection.length > 0) {
            noteCollection.forEach(note => {
                if (note.value.toLowerCase().includes(searchTerm)) {
                    note.style.display = "block"; 
                } else {
                    note.style.display = "none";
                }
            });
        }

    } else {
        var noteCollection = document.querySelectorAll(".note");

        if (noteCollection && noteCollection.length > 0) {
            noteCollection.forEach(note => {
                note.style.display = "block"; 
            });
        }
    }
});

function showTotalCount() {
    document.querySelector('.total-count').innerHTML = getNotes().length 
}

// CTRL + deL : Empty Notes
// CTRL + ALT + N = New note