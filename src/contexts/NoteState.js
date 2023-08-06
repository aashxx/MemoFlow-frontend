import { useState } from "react";
import NoteContext from "./NoteContext"; // Context API

const NoteState = (props) => {

    // Connecting to the backend server
    const host = "https://memoflow-backend.vercel.app";
    let notesInitial = []
    const [notes, setNotes] = useState(notesInitial);


    // Fetch all notes
    const fetchNotes = async () => {
      // API call for server side
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setNotes(json);
    }

    // Add a note
    const addNote = async (title, description, tag) => {
      // API call for server side
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });

      const note = await response.json();
      setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async (id) => {
      // API call for server side
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json();

      // Client side 
      let newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);
    }

    let newNotes = JSON.parse(JSON.stringify(notes));

    // Edit a note
    const editNote = async (id, title, description, tag) => {
      // API call for server side
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();

      // Client side 
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, fetchNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;