import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
export default class Header extends Component {
    render() {
        return (
            <div className='header_container'>
                <NavLink to = {'/'} className= "header_title" >
                    <h2 className= 'Header'>Noteful</h2>
                </NavLink>
            </div>
        )
    }
}
