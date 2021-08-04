import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
    //Import Table to display all departments

import { Button, ButtonToolbar } from 'react-bootstrap';

//import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddDeptModal } from './AddDeptModal';
import { EditDeptModal } from './EditDeptModal';

export class Department extends Component{

    //Use super(props) so that the componenets constructor can get called
    //We can define our variables inside the state of this component
    //addModalShow and editModalShow set to false to hide them
    constructor(props){
        super(props);
        this.state = {deps:[], addModalShow:false, editModalShow:false}
        
    }

    //Function to refresh departments array
    //Fetch() method gets data from department API
    refreshList(){
        fetch("http://127.0.0.1:8000/department")
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});  //Update departments array using setState method
        })
    }

    //Call refresh method inside life cycle method componentDidMount
    componentDidMount(){
        this.refreshList();
    }

    //Call refresh method inside life cycle method componentDidUpdate
    componentDidUpdate(){
        this.refreshList();
    }

    deleteDep(depid){
        if(window.confirm("Are you sure you want to delete this department?")){
            fetch("http://127.0.0.1:8000/department/"+depid,{
                method: 'DELETE',
                header: {'Accept': 'Application/json',
            'Content-Type': 'application/json'}
            })
        }
    }

    //Use bootstrap table to display all departments
    //Display department ID and name as well as edit/delete columns
    //Add button toolbars to allow to edit, add, delete departments (line 76) and pass dept ID and name to modal window
    render(){     
        const {deps, depid, depname} = this.state; 
        let AddModalClose=()=>this.setState({addModalShow:false});
        let EditModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">  
                    <thead>     
                        <tr>
                            <th>DepartmentID</th>
                            <th>DepartmentName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.DepartmentID}>
                                <td>{dep.DepartmentID}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>

<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true, depid:dep.DepartmentID, depname:dep.DepartmenName})}> 
        Edit
    </Button>

    <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteDep(dep.DepartmentID)}>
        Delete
    </Button>

    <EditDeptModal show={this.state.editModalShow}
    onHide={EditModalClose}
    depid={depid}
    depname={depname}/>
</ButtonToolbar>
                                </td>

                            </tr>)}
                    </tbody>
                </Table>
                
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Department</Button>

                    <AddDeptModal show={this.state.addModalShow}
                    onHide={AddModalClose}></AddDeptModal>
                </ButtonToolbar>
             </div>
        )         
    }
}