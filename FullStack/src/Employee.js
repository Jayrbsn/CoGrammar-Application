import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
    //Import Table to display all departments

import { Button, ButtonToolbar } from 'react-bootstrap';

//import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddEmpModal } from './AddEmpModal';
import { EditEmpModal } from './EditEmpModal';

export class Employee extends Component{
    //Use super(props) so that the componenets constructor can get called
    //We can define our variables inside the state of this component
    //addModalShow and editModalShow set to false to hide them
    constructor(props){
        super(props);
        this.state = {emps:[], addModalShow:false, editModalShow:false}
        
    }

    //Function to refresh departments array
    //process.env.REACT_APP_API+
    refreshList(){
        fetch("http://127.0.0.1:8000/employee")
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});  //Update departments array using setState method
        })
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm("Are you sure you want to delete this department?")){
            fetch("http://127.0.0.1:8000/employee/"+empid,{
                method: 'DELETE',
                header: {'Accept': 'Application/json',
            'Content-Type': 'application/json'}
            })
        }
    }

    render(){     
        const {emps, empid, empname, depmt, photofilename, doj} = this.state; 
        let AddModalClose=()=>this.setState({addModalShow:false});
        let EditModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>EmployeeID</th>
                            <th>EmployeeName</th>
                            <th>Department</th>
                            <th>DOJ</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.EmployeeID}>
                                <td>{emp.EmployeeID}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateOfJoining}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true, empid:emp.EmployeeID, empname:emp.EmployeeName,
    depmt:emp.Department, photofilename:emp.PhotoFileName, doj:emp.DateOfJoining})}>
        Edit
    </Button>

    <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.EmployeeID)}>
        Delete
    </Button>

    <EditEmpModal show={this.state.editModalShow}
    onHide={EditModalClose}
    empid={empid}
    empname={empname}
    depmt={depmt}
    photofilename={photofilename}
    doj={doj}/>
</ButtonToolbar>
                                </td>

                            </tr>)}
                    </tbody>
                </Table>
                
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Employee</Button>

                    <AddEmpModal show={this.state.addModalShow}
                    onHide={AddModalClose}></AddEmpModal>
                </ButtonToolbar>
             </div>
        )         
    }
}