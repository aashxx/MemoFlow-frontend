import { React, useContext } from 'react';
import NoteContext from '../contexts/NoteContext'; // Context API
import '../index.css';

const NoteItem = (props) => {
    const context = useContext(NoteContext); // Importing from Context API
    const {deleteNote} = context; // Deleting a note
    const {note, updatenote} = props; // Updating a note

    return (
        <div className='col-md-3'>
            <div className="card my-3 note-item">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className='far fa-trash-alt mx-2' onClick={()=>{deleteNote(note._id); props.showAlert("Note deleted successfully", "success");}}></i>
                        <i className='far fa-edit mx-2' onClick={()=>{updatenote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <p className='text-muted'>{note.tag}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;
