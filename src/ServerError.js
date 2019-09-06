import React, { Component } from 'react'

export default class ServerError extends Component {

    constructor(props){
        super(props)
        this.state={
            hasError: false
        }
    }
    static getDerivedStateFromError(error){
        return{hasError:true};
    }
    render() {
        if(this.state.hasError){
        return (   
            <h4>Application could not receive the data from Server</h4>
        )
        }
        return this.props.children
    }
}
