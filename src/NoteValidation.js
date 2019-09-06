import React from 'react'
import PropTypes from 'prop-types';
export default function NoteValidation(props) {
    NoteValidation.propTypes={
        value: PropTypes.func.isRequired
    }
    NoteValidation.defaultProps = {
        value:(()=>{
            return "Missing Information on the form"
        })
    }

    if(props.message){
        return (
            <div className='folder_validation'>{props.message}</div>
        )
    }
    return <></>

    
} 