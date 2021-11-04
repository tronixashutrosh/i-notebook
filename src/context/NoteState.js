import React, {useState} from "react";
import NoteContext from "./noteContext";


const NoteState= (props)=>{
    const host="http://localhost:5000";
    const notesInitial= [];
    const[notes, setNotes] = useState(notesInitial);

//Get all notes
    const getNote= async(title, description, tag)=>{
    
     // API call
        const response = await fetch(`${host}api/notes/fetchallnotes`, {
         method: 'GET',
         headers: {
         'Content-Type': 'application/json',
         'auth-token': localStorage.getItem('token')
         },
        body: JSON.stringify({title, description, tag})
     });
    const json= await response.json()
    setNotes(json);
    }

// Add notes
    const addNote= async(title, description, tag)=>{
    
     // API call
        const response = await fetch(`${host}api/notes/addnotes`, {
         method: 'POST',
         headers: {
         'Content-Type': 'application/json',
         'auth-token': localStorage.getItem('token')
         },
         body: JSON.stringify({title, description, tag})
     });
     const json= await response.json();
    setNotes(notes.concat(notes));
    }
   
// Delete notes
    const deleteNote= async(id)=>{
     // API call
         const response = await fetch(`${host}api/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            },
        });
        const json= await response.json()    
        const newNote= notes.filter((notes)=>{return notes._id!==id})
        setNotes(newNote)
    }
 
   
// Edit notes
    
const editNote= async(id, title, description, tag)=>{
  
  // API call
    const response = await fetch(`${host}api/notes/updatenotes/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
    });
    const json= await response.json();
      
    let newNotes= JSON.parse(JSON.stringify(notes))
    //For Client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title= title;
                newNotes[index].title= description;
                newNotes[index].title= tag;
                break;
            }
        }
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;