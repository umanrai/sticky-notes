const notesConatiner = document.getElementById("app");
const addNoteButton = notesConatiner.querySelector(".add-note");
const noteCollection = document.querySelector(".note");

showNotes()

function showNotes() {
    getNotes().forEach((note) => {
        // console.log(note, typeof note)
        const noteElement = createNoteElement(note.id, note.content);
        notesConatiner.insertBefore(noteElement, addNoteButton);
        
        noteElement.focus();
    })
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
    notesConatiner.insertBefore(noteElement, addNoteButton);
    noteElement.focus();
    notes.push(noteObject);
    saveNotes(notes);
    // saveNotes([]);
    // showNotes()
// }
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
}

document.addEventListener('keydown', function(event) {

    if (event.ctrlKey && event.altKey && event.code == "KeyN") {
        // Call the addNote() function
        addNote();
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


// CTRL + deL : Empty Notes
// CTRL + ALT + N = New note