import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditDeptModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch("http://127.0.0.1:8000/department",{
            method:'PUT',
            headers:{
                'Accept': 'application/json', 
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartmentID:event.target.DepartmentID.value,
                DepartmentName:event.target.DepartmentName.value
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
                Edit Department
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="DepartmentID">
                            <Form.Label>DepartmentID</Form.Label>
                            <Form.Control type="text" name="DepartmentID" required
                            disabled    //Disable form to display department ID
                            defaultValue={this.props.depid} //Find value from first screen and send it using defaultValue
                            placeholder="DepartmenName"/>
                        </Form.Group>

                        <Form.Group controlId="DepartmentName">
                            <Form.Label>DepartmentName</Form.Label>
                            <Form.Control type="text" name="DepartmentName" required
                            defaultValue={this.props.depname}
                            placeholder="DepartmenName"/>
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Update Department
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