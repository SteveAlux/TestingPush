import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import FolderContext from './FolderContext';





class Notes extends Component {
   
   createList(context){
     
      const notelist = context.filter(note=>{
         console.log(note.folderId)
         console.log(this.props)
        return this.props.match.params.folderId === note.folderId
      })
      
      const list=notelist.map(array =>{
         console.log(array.folderId)
         return(
            <>
            
         <li>
            <h4><NavLink to = {`/${array.folderId}/NotesPage/note/${array.id}`}>{array.name}</NavLink></h4>
            <p>Date Modified: {array.modified.slice(0,10)}</p>
         </li>
         </>
         )
      })
      console.log(this.props)
      return list;
   }
     openForm = (callback)=>{
        callback('/Form/Addnote');
     }
    render() {
       
        
        
        return (
           <>
           <h5 className= 'Notes_title'>Notes:</h5>
            <FolderContext.Consumer>
               {(context) =>(
           <ul className = "folder_list_specific">
              {this.createList(context.dataBase.notes)}
                <button onClick = {() =>{
                   this.openForm(context.openNoteForm)
                }}className='add_note_button'>
          Add Note
        </button>
           </ul>
               )}
            
           </FolderContext.Consumer>
           </>
        )
    }
}
export default withRouter(Notes)
