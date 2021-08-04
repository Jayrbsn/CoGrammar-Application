import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

export class EditEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = "http://127.0.0.1:8000/media/"+this.photofilename;

    componentDidMount(){
        fetch("http://127.0.0.1:8000/department")
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    //Fetch url for employee API
    //Additional fields for employee model
    handleSubmit(event){
        event.preventDefault();
        fetch("http://127.0.0.1:8000/employee",{
            method:'PUT',
            headers:{
                'Accept': 'application/json', 
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeID:event.target.EmployeeID.value,
                EmployeeName:event.target.EmployeeName.value,
                Department:event.target.Department.value,
                DateOfJoining:event.target.DateOfJoining.value,
                PhotoFileName:this.photofilename
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result)
        },
        (error) => {
            alert("Failed");
        })
    }

    handleFileSelected(event){
        event.preventDefault();
        this.photofilename = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            'UploadedFile',
            event.target.files[0],
            event.target.files[0].name
        );
    

        fetch("http://127.0.0.1:8000/employee/SaveFile", {
            method: 'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc="http://127.0.0.1:8000/media/"+result;
        },
        (error)=>{
            alert("Failed");
        })

    }

    render(){
        return (
            <div className="container">
<Modal
    {...this.props}
    size="lg"
    aria-labelledby="contianed-modal-title-vcenter"
    centered
    >

        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Edit Employee
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="EmployeeID">
                            <Form.Label>EmployeetID</Form.Label>
                            <Form.Control type="text" name="EmployeeID" required
                            placeholder="EmployeeID"
                            disabled    //Disable to show employee ID 
                            defaultValue={this.props.empid} //Find value from first screen using defaultValue
                            />   
                        </Form.Group>

                        <Form.Group controlId="EmployeeName">
                            <Form.Label>EmployeetName</Form.Label>
                            <Form.Control type="text" name="EmployeeName" required
                            defaultValue={this.props.empname}
                            placeholder="EmployeeName"/>
                        </Form.Group>

                        <Form.Group controlId="Department">
                            <Form.Label>Department</Form.Label>
                            <Form.Control as='select' defaultValue={this.props.depmt}>
                                {this.state.deps.map(dep=>
                                    <option key={dep.DepartmentID}>{dep.DepartmentName}</option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="DateOfJoining">
                            <Form.Label>DateOfJoining</Form.Label>
                            <Form.Control 
                            type = "Date"
                            name = "DateOfJoining"
                            required
                            placeholder = "DateOfJoining"
                            defaultValue={this.props.doj}/>
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Update Employee
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>

                <Col sm={6}>
                    <Image width="200px" height="200px" 
                    src={"http://127.0.0.1:8000/media/"+this.props.photofilename}/>
                    <input onChange={this.handleFileSelected} type="File"/>
                </Col>
            </Row>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
</Modal>
            </div>
        )
    }
}