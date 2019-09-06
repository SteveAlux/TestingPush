import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import  FolderContext from './FolderContext';
import FolderValidation from './FolderValidation';
class AddFolder extends Component {

    constructor (props){
        super(props)
        this.state = {
            folder:{
                value: '',
                touched:false
            }
        }
    }
    folderNameChange(name){
        this.setState({
            folder :{
                value:name,
                touched:true
            }
        })
    }

    handleSubmit (event,context){
        event.preventDefault();
        console.log('FOLDER HAS BEEN SUBMITTED',this.state.folder.value )
        let id = this.state.folder.value
        // Math.floor((Math.random()*10000)+1000)
        
       
            let folderObj = {
                id:id.toString(),
                name:this.state.folder.value
            }
            context.postFolder(folderObj)  
    }
    validateFolder(context){
        const folder = this.state.folder.value
        if(folder.length <3 || folder.length>10)
            return'Folder name must be between 3 to 10 characters long'
        for(let i = 0; i<context.dataBase.folders.length;i++){
            if(folder === context.dataBase.folders[i].name)
            return `${this.state.folder.value} is already a folder name. `
        }
    }
    

    render() {
        
        return (
           <FolderContext.Consumer>
               {(context)=>(
            <form  className= 'folder_form' onSubmit = {(e) =>{this.handleSubmit(e,context)}}>
                <h3 className='form_title'>Add Folder:</h3>
                <h5 className='folder_input_hint'>* Indicate needed fields</h5>
                
                    <label htmlFor = "folder" className='folder_input_title'>*Name:  </label>
                    <input className='folder_input' 
                        type="text"
                        id ='folder'
                        name = 'folder'
                        placeholder = 'Name of Folder'
                        onChange = {(e)=>{this.folderNameChange(e.target.value)}}
                    />
                
                {this.state.folder.touched && <FolderValidation message = {this.validateFolder(context)}/>}
                <input  className='submit_button'type = 'submit' value= 'Submit'
                disabled = {this.validateFolder(context)}/>
                
            </form>
               )}
           </FolderContext.Consumer>
        )
    }
}
export default withRouter (AddFolder);