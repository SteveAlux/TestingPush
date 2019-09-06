import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import FolderContext from './FolderContext';


export default class Main extends Component {
  openForm=(callback,path)=>{
       callback(path)
     }
    render(){
        
        return (
            
            <>
            <h5 className= 'Notes_title'>Notes:</h5>
            <FolderContext.Consumer>
                {(context) =>(
            <>
            <ul className = "folder_list">
            {context.dataBase.notes.map(note =>
                <li key = {note.id}>
                    <h4><NavLink to ={`/${note.folderId}/NotesPage/note/${note.id}`}>{note.name}</NavLink></h4>
                   
                </li>)}
                
            
            </ul> 
            <div className="add_note_container">
            <button  className= 'add_note_button'onClick = {() =>{this.openForm(context.openNoteForm,'/Form/Addnote')}}>Add Note</button>
            </div>
            </>
                )}
            </FolderContext.Consumer>
            </>
            
        )
            }
}


 