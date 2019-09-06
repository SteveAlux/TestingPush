import React from 'react'


const FolderContext = React.createContext({
    dataBase:[],
    addFolder: () =>{},
    deleteNote: () =>{},
    UpdateFolder: () =>{},
    openFolderForm: () =>{},
    openNoteForm: () =>{},
    postNote: () =>{},
    postFolder: () =>{}
})

export default FolderContext;