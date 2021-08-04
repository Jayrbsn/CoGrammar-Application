import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        
        return(
            //Add in basic navigation menu to appear at top of web page
            //Navlink takes user to url of selected menu option
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic_navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav"/>
                <Nav>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">  
                        Home
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/department">
                        Department
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/employee">
                        Employee
                    </NavLink>
                </Nav>                
                <Navbar.Collapse/>                
            </Navbar>
        ) 
        
    }
}