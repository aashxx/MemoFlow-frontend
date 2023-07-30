import {React, useContext, useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../contexts/NoteContext'; // Context API
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {
    const {showAlert} = props;
    const context = useContext(NoteContext); // Importing from Context API
    const {notes, fetchNotes, editNote} = context; // Extracting fetchNotes and editNote methods from Context API
    let navigate = useNavigate();

    // Displays home page only if auth-token is validated in localStorage otherwise displays login page.
    useEffect(()=>{
        if(localStorage.getItem('token')){
            fetchNotes();
        } else {
            navigate('/signup');
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    // state variable for  edit note
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});

    // Input details changed in updateNote
    const handleChange = (event) => {
        setNote({...note, [event.target.name]: event.target.value});
    }

    // Updating the note after validation
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }

    // Storing the updated data to db
    const handleClick = (event) => {
        event.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Note updated successfully", "success");
    }

    return (
        <>
        {/*Add note component */}
        <AddNote showAlert={showAlert}/>

        {/* Popup form for editing a note */}
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel" style={{color: '#673ab7', textAlign: 'center'}}>Edit Note</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                {/* Form triggered for editing note  */}
                <div className="modal-body">
                    <form className='my-5' onSubmit={handleClick}>
                        <div className="mb-3">
                            <label htmlFor="etitle" className="form-label">Title</label>
                            <input type="text" className="form-control" value={note.etitle} id="etitle" name='etitle' aria-describedby="emailHelp" onChange={handleChange} minLength={3} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="edescription" className="form-label">Description</label>
                            <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={handleChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="etag" className="form-label">Tag</label>
                            <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={handleChange}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary">Update Note</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        
        {/* Displaying the notes added by the user */}
        <div className='row my-3'>
        <h1 style={{color: '#673ab7', textAlign: 'center'}}>Your Notes</h1>
        {
            notes.map((note)=>{
                return (
                    <NoteItem key={note._id} updatenote={updateNote} showAlert={showAlert} note={note}/>
                )
            })
        }
        </div>
        </>
    )
    }

export default Notes;
