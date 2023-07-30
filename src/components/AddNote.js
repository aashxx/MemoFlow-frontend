import { React, useState, useContext } from 'react';
import NoteContext from '../contexts/NoteContext'; // Context API

const AddNote = (props) => {
    const context = useContext(NoteContext); // Importing from Context API
    const {addNote} = context; // Adding a note

    const [note, setNote] = useState({title: "", description: "", tag: ""});

    // Inputs note details
    const handleChange = (event) => {
        setNote({...note, [event.target.name]: event.target.value});
    }

    // Adding note to db and displaying.
    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Note added successfully", "success");
    }

    return (
        <div className='login'>
        <h1 style={{color: '#673ab7', textAlign: 'center', marginTop: '20px'}}>Add Note</h1>
        <form className='my-5' onSubmit={handleClick}>
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title}  onChange={handleChange} minLength={3} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange} minLength={5} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Add Note</button>
        </form>
        </div>
    )
}

export default AddNote;
