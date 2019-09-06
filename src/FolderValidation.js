import React from 'react'

export default function FolderValidation(props) {
    if(props.message){
        return (
            <div className='folder_validation'>{props.message}</div>
        )
    }
    return <></>
}
