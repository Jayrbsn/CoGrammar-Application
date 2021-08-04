import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddDeptModal extends Component{
    //Use super(props) so that the componenets constructor can get called
    //Bind handleSubmit function
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    //Method to save department name using API
    handleSubmit(event){
        event.preventDefault();
        fetch("http://127.0.0.1:8000/department",{
            method:'POST',
            headers:{
                'Accept': 'application/json', 
                'Content-Type':'application/json'
            },
            //Body has department name in JSON format
            body:JSON.stringify({
                DepartmentID:null,
                DepartmentName:event.target.DepartmentName.value
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

    //Add form with textbox for department name (line 59)
    //Add button to save department (line 66)
    //The footer will have a close button to close modal window (line 76)
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
                Add Department
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <Row>       
                <Col sm={6}>    
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="DepartmentName"> 
                            <Form.Label>DepartmentName</Form.Label> 
                            <Form.Control type="text" name="DepartmentName" required
                            placeholder="DepartmenName"/>
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Add Department
                            </Button>
                        </Form.Group>
                    </Form>
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