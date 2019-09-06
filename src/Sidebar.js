import React, { Component } from 'react'
import Data from './Data';
import {NavLink} from 'react-router-dom';
import FolderContext from './FolderContext';
import Folder from './Folder';
import {withRouter} from 'react-router-dom';
class Sidebar extends Component {

   

openFolderForm=(callback) =>  {
                    callback('/Form/Addfolder');
    // console.log('updatefolder clicked')
    }
    render() {
        return(
           <FolderContext.Consumer>
               {(context) =>(
            <>
            <ul className='folder_list_main'>
                {context.dataBase.folders.map(d =>
                    <li key = {d.id}>
                        <h4 id='main_folder_name'><NavLink to ={`/FolderPage/folder/${d.id}`}>{d.name}</NavLink></h4>
                        
                </li>)}
                <button className='add_folder_button' onClick = {() =>{
                    this.openFolderForm(context.openFolderForm)
            } 
                    }>
            Add Folder
        </button>
            </ul>
            
           
               
        </>
               )}
           </FolderContext.Consumer>
        )
    }
}
export default withRouter (Sidebar)
