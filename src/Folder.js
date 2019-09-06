import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import FolderContext from './FolderContext';


 class Folder extends Component {
    updateFolder=(context,callback) => {
        console.log(context.dataBase.folders)
        console.log(document.getElementById('foldername').value)
        console.log(this.props)
       let name1 = document.getElementById('foldername').value
       let id = 
    //    console.log(this.props.updateFolder)
        callback(name1);
    // console.log('updatefolder clicked')
    }

    openFolderForm=(callback)=>{
        callback('/Form/Addfolder')
    }
    render() {
        
        return (
            <FolderContext.Consumer>
                {(context)=>(
                   
                    <>
            <ul className = "folder_list_main">
            {context.dataBase.folders.map(d =>
                <li key = {d.id}>
                    <h4 id='main_folder_name'><NavLink to ={`/FolderPage/folder/${d.id}`}>{d.name}</NavLink></h4>
                    
                </li>)}
                <button className='add_folder_button' onClick = {() => this.openFolderForm(context.openFolderForm)}>
            Add Folder
        </button>
            </ul>
          
           
        </>
                )}
        </FolderContext.Consumer>
        )
    }
}
export default withRouter(Folder);
