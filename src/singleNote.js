import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import Folder from './Folder';
import FolderContext from './FolderContext';
 class SingleNote extends Component {

   deleteNote(context,noteId){
      console.log(context.deleteNote)
      context.deleteNote(context,noteId)
      this.props.history.push('/')
   }

   createNote=(context,data)=>{
      
      console.log(data)
      console.log(this.props.match.params.noteId )
      const notes =data.notes.find( (n =>
         n.id === this.props.match.params.noteId   

        ))
      console.log(notes)
      let noteDate = notes.modified.slice(0,10)
        return(
      <div className='note_container'>  
            <h3 className='note_name'>{notes.name}</h3>
            <p className='note_date'>Date Modified: {noteDate}</p>
            <p className='note_content'>{notes.content}</p>
            <button className='note_delete' onClick = {() => {
               this.deleteNote(context,notes.id)
            }}>Delete Note</button>
            </div>
        )
   }

    render() { 
        return (
           <FolderContext.Consumer>
              {(context) =>(
                 
                 this.createNote(context,context.dataBase)
              )}
           </FolderContext.Consumer>
        )
    }
}
export default withRouter(SingleNote);
