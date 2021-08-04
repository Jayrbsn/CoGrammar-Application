import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

export class AddEmpModal extends Component{
    //Use super(props) so that the componenets constructor can get called
    //Bind handleSubmit function
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    //Variables to store profile pic details and photo paths
    photofilename = "anonymous.png";
    imagesrc = "http://127.0.0.1:8000/media/"+this.photofilename;

    componentDidMount(){
        fetch("http://127.0.0.1:8000/department")
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    //Method to save new employee using API
    handleSubmit(event){
        event.preventDefault();
        fetch("http://127.0.0.1:8000/employee",{
            method:'POST',
            headers:{
                'Accept': 'application/json', 
                'Content-Type':'application/json'
            },
            //Body has department name in JSON format
            body:JSON.stringify({
                EmployeeID:null,
                EmployeeName:event.target.EmployeeName.value,
                Department:event.target.Department.value,
                DateOfJoining:event.target.DateOfJoining.value,
                PhotoFileName:this.photofilename
            })
        })
        //Display result in alert box for user
        .then(res=>res.json())
        .then((result)=>{
            alert(result)
        },
        (error) => {
            alert("Failed");
        })
    }

    //Method to save uploaded photo
    handleFileSelected(event){
        event.preventDefault();
        this.photofilename = event.target.files[0].name;
        const formData = new FormData();    //Use FormData and append the uploaded file to it
        formData.append(
            'UploadedFile',
            event.target.files[0],
            event.target.files[0].name
        );
    
        //Send photo to the SaveFile API method
        //If successful update image source, else notify user of failure
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

    //Add form with textbox for employee name (line 107)
    //Add button to save department (line 130)
    //The footer will have a close button to close modal window (line 146)
    //Make Department field dropdown (line 113)
    //Make DateOfJoining field a date picker (line 121)
    //Display uploaded profile pic + button to add new pic (line 138)
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
                Add Employee
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="EmployeeName">
                            <Form.Label>EmployeetName</Form.Label>
                            <Form.Control type="text" name="EmployeeName" required
                            placeholder="EmployeeName"/>
                        </Form.Group>

                        <Form.Group controlId="Department"> 
                            <Form.Label>Department</Form.Label>
                            <Form.Control as='select'>  
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
                            placeholder = "DateOfJoining"/>
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Add Employee
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>

                <Col sm={6}>
                    <Image width="200px" height="200px" src={this.imagesrc}/>
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