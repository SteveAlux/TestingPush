import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Main from './Main';
import Folder from './Folder';
import Data from './Data';
import Notes from './Notes';
import SingleNote from './singleNote';
import FolderContext from './FolderContext';
import './App.css';
import AddNote from './AddNote';
import AddFolder from './AddFolder';
import {withRouter} from 'react-router-dom';
import ServerError from './ServerError';

class App extends Component {

  constructor(props){
    super(props)
    this.goBack= this.goBack.bind(this);
  this.state = {
    dataBase: {
      'folders':[],
      'notes':[]
      }
    
    }
  }

  componentWillUnmount(){
    console.log('UNMOUNT')
  }
 componentDidMount(){
   console.log('RUNNING MOUNT AGAIN')
  fetch ('http://localhost:9090/folders',{
    method:'GET',
    headers:{
      'content-type':'application-json'
    },
  })
  .then(res => {
    if (!res.ok){
      return res.json.then(error =>{
        throw error
      })
    }
    return res.json()
  })
  .then(data =>{
    console.log("JSON Folders: WORKS")
    console.log(data)
   
    this.setState({
      dataBase:  {
        'folders':data,
        'notes':[]
      }
    })
     
    })
    

  .then( ()=>{
    fetch('http://localhost:9090/notes',{
      method:'GET',
      headers:{
        'content-type': 'application-json'
      },

    })
    .then(res => {
      if (!res.ok){
        return res.json.then(error =>{
          throw error
        })
      }
      return res.json()
    })
    .then(data =>{
      console.log(this.state.dataBase)
      console.log("JSON NOTES:WORKS")
      console.log(data)
      let currentState= this.state.dataBase.folders
      this.setState({
        dataBase:  {
          'folders': currentState,
          'notes':data
        }
      })
  })
  })
 }
 
  

  UpdateFolder =(name1)=>{
    console.log(name1);
    this.state.dataBase.folders.push({
      name:name1,
      id:Math.floor(Math.random() * 10000)
    })
    this.setState({
      dataBase:this.state.dataBase
    })
  }
  deleteNote =(context,noteId) =>{
    fetch(`http://localhost:9090/notes/${noteId}`,{
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
    })
   .then(()=> {
     fetch(`http://localhost:9090/notes`,{
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
    })
    .then(res => {
        if (!res.ok){
          return res.json.then(error =>{
            throw error
          })
        }
        return res.json()
      })
    .then(data =>{
        console.log('AFTER BEING DELETED THIS IS THE NEW LIST')
        console.log(data)
        this.setState({
          dataBase:{
            folders:this.state.dataBase.folders,
          notes: data
          }
        })
      })  
   })
  }
  goBack(){
    this.props.history.goBack();
  }

  openFolderForm=(path)=>{
    this.props.history.push(path)
  }
  openNoteForm = (path) =>{
    this.props.history.push(path)
  }
  postNote = (noteObj) =>{
    fetch('http://localhost:9090/notes',{
      method:'POST',
      headers:{
        'content-type': 'application/json',
        
      },
      body:JSON.stringify(noteObj)
    })

    .then(res => {
      if (!res.ok){
        return res.json.then(error =>{
          throw error
        })
      }
      return res.json()
    })
  .then(data =>{
      console.log('After being POSTED')
      console.log(data)
     
    
      fetch ('http://localhost:9090/folders',{
      method:'GET',
      headers:{
        'content-type':'application-json'
      },
      })
      .then(res => {
        if (!res.ok){
          return res.json.then(error =>{
            throw error
          })
        }
        return res.json()
      })
      .then(data =>{
        console.log("JSON Folders: WORKS")
        console.log(data)
       
        this.setState({
          dataBase:  {
            'folders':data,
            'notes':[]
          }
        })
         
        })
        
    
      .then( ()=>{
        fetch('http://localhost:9090/notes',{
          method:'GET',
          headers:{
            'content-type': 'application-json'
          },
    
        })
        .then(res => {
          if (!res.ok){
            return res.json.then(error =>{
              throw error
            })
          }
          return res.json()
        })
          .then(data =>{
            console.log(this.state.dataBase)
            console.log("JSON NOTES:WORKS")
            console.log(data)
            let currentState= this.state.dataBase.folders
            this.setState({
              dataBase:  {
                'folders': currentState,
                'notes':data
              }
            })
          })
          console.log('Finishing of PostNote on App.js')
          this.props.history.push('/')
        })
    })
  }

  postFolder=(folderObj)=>{
    fetch('http://localhost:9090/folders',{
      method:'POST',
      headers:{
        'content-type': 'application/json',
        
      },
      body:JSON.stringify(folderObj)
    })

    .then(res => {
      if (!res.ok){
        return res.json.then(error =>{
          throw error
        })
      }
      return res.json()
    })
    .then(data =>{
      fetch ('http://localhost:9090/folders',{
        method:'GET',
        headers:{
        'content-type':'application-json'
        },
      })
      .then(res => {
        if (!res.ok){
          return res.json.then(error =>{
            throw error
          })
        }
        return res.json()
      })
      .then(data =>{  
        this.setState({
          dataBase:  {
            'folders':data,
            'notes':[]
          }
        })       
      })
      .then( ()=>{
        fetch('http://localhost:9090/notes',{
          method:'GET',
          headers:{
            'content-type': 'application-json'
          },
    
        })
        .then(res => {
          if (!res.ok){
            return res.json.then(error =>{
              throw error
            })
          }
          return res.json()
        })
          .then(data =>{
            console.log(this.state.dataBase)
            console.log("JSON NOTES:WORKS")
            console.log(data)
            let currentState= this.state.dataBase.folders
            this.setState({
              dataBase:  {
                'folders': currentState,
                'notes':data
              }
            })
          })
          console.log('Finishing of PostFolder on App.js')
          this.props.history.push('/')
        })
  })
}
  
  
  render() {
    
    const contextValue = {
      dataBase: this.state.dataBase,
      addFolder: this.UpdateFolder,
      deleteNote: this.deleteNote,
      UpdateFolder: this.UpdateFolder,
      openFolderForm: this.openFolderForm,
      openNoteForm: this.openNoteForm,
      postNote: this.postNote,
      postFolder: this.postFolder
    }
    console.log("APP CONTEXT VALUE",contextValue)
    return (
      <>
      <FolderContext.Provider value = {contextValue}>
      < Header />
    <div className='main_app'>
         
         <article>
         <ServerError>
         <Route path = '/:folderId/NotesPage/note/:noteId' 
          render = {() =>{
            return (
              <button className='goback_button' onClick = {this.goBack}>
                Go Back
              </button>
            
            )
           }}
          />
          </ServerError>
          
            
            <ServerError>
           <Route path = '/FolderPage/folder/:folderId'
            render = {() =>{
              return (
                <>
                  <h5 className='Folder_title'>Folders:</h5>
                  <Folder />
                  < Notes/>
                </>
              )
            }}
           />
           </ServerError>
           <ServerError>
           <Route  exact path = '/'
          render = { () => {
            return (
              <>
              <h5 className='Folder_title'>Folders:</h5>
              < Sidebar />
              < Main />
              </>
            )
          }}
        />
        </ServerError>
        
        </article>
        
          <ServerError>
          <Route exact path = "/Form/Addfolder" 
          render = {()=>{
            return (
              
                <AddFolder />
            )
          }} />
          </ServerError>
          <ServerError>
          <Route exact path = '/:folderId/NotesPage/note/:noteId' 
          render = {() =>{
            return (
              < SingleNote />
            )
          }}
          />
          </ServerError>
        
        <ServerError>
        <Route exact path = "/Form/Addnote"
          render = {() =>{
            return(
              <AddNote />
            )
          }}
        />
        </ServerError>
      </div>
      </FolderContext.Provider>
      </>
    )
  }
}
export default withRouter(App)
