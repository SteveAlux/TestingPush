import React, { Component } from 'react';
import FolderContext from './FolderContext';
import {withRouter} from 'react-router-dom';
import NoteValidation from './NoteValidation';
class AddNote extends Component {
    constructor(props){
        super(props);
            this.state ={            
                title: {
                    value:'',
                    touched:false,
                },
                content:{
                    value:'',
                    touched:false,
                },
                folder:{
                    value: 'null',
                    touched:false
                }
            }
              
    }
    // componentDidMount(){
    //     this.setState({
    //         title: {
    //             value:'',
    //             touched:false,
    //         },
    //         content:{
    //             value:'',
    //             touched:false,
    //         },
    //         folder:{
    //             value: '',
    //             touched:false
    //         }
    //     })
    // }
    createdropdown(context){
        let folderList = context.dataBase.folders.map((folder) =>{
           return <option value = {folder.name}>{folder.name}</option>
        })
        return(
            <>
            <label htmlFor='list'></label>
            <div className='select_list' name = "folders" id='list'>
                
                <select className='note_form_dropdown'  name='list' onChange = {(e) =>this.updateList(e.target.value)}>    
                <option value ='null'>Select a folder</option>
                {folderList}
                </select>
           </div>
           </>
        )
    }
     getDateFormat(date) {
        var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        var date = new Date();
        date.toLocaleDateString();
        
        return [year, day, month].join('-');
        }
        
    handleSubmit(event,context){
        event.preventDefault();
        const {title,content,folder} = this.state
        console.log("title: ",title.value)
        console.log('content: ',content.value);
        console.log('Folder TO:',folder.value)
       let mainFolder = context.dataBase.folders.find(folderdata =>{
           return folderdata.name === folder.value
        })
        let folderId = mainFolder.id
        let datefirst= Date.now()
        let date= this.getDateFormat(datefirst)
        let number = Math.floor((Math.random()*100)+1);
        let noteObj = {
            "id": number.toString(),
            "name": this.state.title.value,
            "modified": date,
            "folderId": folderId,
            "content": this.state.content.value
        }
        context.postNote(noteObj)
       
    }
    updateTitle(title1){
        this.setState({
            title:{
                value: title1,
                touched:true,
            }
        })
    }
    updatecontent(content1){
        this.setState({
            content:{
                value:content1,
                touched:true,
            }
        })
    }
    updateList(list){
        this.setState ({
            folder:{
                value:list,
                touched:true
            }
        })
    }

    validateName(){
        const name= this.state.title.value.trim();
        if(name.length===0){
            return "Name is required"
        }else if(name.length<2 || name.length>80){
            return "Name has to be between 2 and 80 characters"
        }
    }
    validateContent(){
        const text= this.state.content.value.trim();
        if(text.length===0){
            return "Content is needed"
        }else if(text.length<5 || text.length>2000){
            return "Content has to be between 5 and 2000 characters"
        }
    }
    validateList(){
        const password = this.state.folder.value.trim()
        if (password === 'null'){
            return 'Please select a folder'
        }

    }
    


    render() {
        const nameError = this.validateName();
        const contentError = this.validateContent();
        const listError = this.validateList();
       
        return (
            <FolderContext.Consumer>
                {(context) =>(
                
                
            <>
           <form className='note_form' onSubmit = {e =>  this.handleSubmit(e,context)}>
                <h3>Add Note</h3>
                <h5 className='folder_input_hint'>* indicate required fields</h5>
                <label className='note_input_title' htmlFor='name'>Name</label>
                <input 
                    className='note_form_name input'
                    name ='name' 
                    id= 'name'
                    type= 'text'
                    onChange = {(e) => this.updateTitle(e.target.value)}
                />
                {this.state.title.touched && <NoteValidation message={nameError} /> }
               
                {this.createdropdown(context)}
                {this.state.folder.touched && <NoteValidation message = {listError}/>}
               
                <label className='note_input_title' htmlFor='content'>Content</label>
                <input
                    className='note_form_content input'
                    type='text'
                    id='content'
                    name= 'content'
                    onChange={(e)=> this.updatecontent(e.target.value)}
                />
                {this.state.content.touched && <NoteValidation message= {contentError} />}
                <input className='submit_button' type='submit' value = "Submit"
                disabled = {this.validateContent() || this.validateList() || this.validateName()}
                 />
           </form>
           
           </>
                )}
           </FolderContext.Consumer>
        )
    }
}
export default withRouter(AddNote)