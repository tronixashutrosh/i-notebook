import React, {useContext, useEffect, useRef, useState} from 'react';
import { useHistory } from 'react-router';
import noteContext from '../context/noteContext';
import { AddNotes } from './AddNotes';
import Noteitems from './Noteitems';

const Notes = (props) => {
    const context= useContext(noteContext);
    const {notes, getNote, editNote}= context;
    let history= useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote(); 
        }
        else{
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: ""})    
    
    const updateNote= (currentNote)=>{
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }
    
    const onChange= (e)=>{
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit= (e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag);
        ref.current.click();
        props.showAlert("updated sucessfully", "success");
    }
    return (
        <>
        <AddNotes showAlert={props.showAlert}/>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalLong">
         Launch demo modal</button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="title" aria-describedby="emailHelp" value={notes.etitle} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="description" value={notes.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="tag" value={notes.etag} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
                </form>
            <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button disabled={note.etitle.length< 5 || notes.edescription.length< 5} onClick={handleSubmit} type="button" className="btn btn-primary">Save changes</button>
            </div>
        </div>
        </div>
        </div>
        </div>
        

        <div className="row my-3">
                <h2>Saved Notes</h2>
                <div className="container">
                {notes.length===0 && 'No notes added yet'}
                </div>
                {notes.map((notes)=>{
                    return <Noteitems key={notes._id} updateNote={updateNote} showAlert={props.showAlert} notes={notes}/>
                })}
            </div>
    </> 
    )
}

export default Notes
