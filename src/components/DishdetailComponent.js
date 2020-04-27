import React, {useState} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'
   
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const SubmitCommentForm  = () => {
  
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
  
    return (
      <div>
        <Button color="warning" onClick={toggle}>Submit Comment</Button>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Submit Comment</ModalHeader>
          <ModalBody>
                <LocalForm onSubmit={(values) => handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="rating" md = {12}>Rating:</Label>
                        <Col md = {12}>
                            <Control.select model=".rating" name="rating"
                                className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="name" md={12}>Your Name:</Label>
                        <Col md={12}>
                            <Control.text model=".name" id="name" name="name"
                                placeholder="Your Name"
                                className="form-control" 
                                validators={{
                                    minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters ',
                                        maxLength: 'Must be 15 characters or less '
                                    }}
                                />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="comment" md={12}>Comment:</Label>
                        <Col md={12}>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                rows="5"
                                className="form-control" />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Button type="submit" color="success"> Submit </Button>
                        </Col>
                    </Row>
                </LocalForm>
            </ModalBody>
        </Modal>
      </div>
    );
  }

    function handleSubmit(values) {
        alert('Comment submitting is: ' + JSON.stringify(values));
    }


    function RenderDish({dish}) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle><h3>{dish.name}</h3></CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    function RenderComments({comments}){
        if (comments != null){
            return(
                <div className="col-12  m-1">
                     <h4>Comments</h4>
                     <ul className = "list-unstyled">
                        {comments.map((comment) =>{
                            return (
                                <li key = {comment.id}>
                                <p> {comment.comment} </p>
                                <p>-- {comment.author}, {new Intl.DateTimeFormat("en-GB", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "2-digit",
                                                        }).format(new Date(comment.date))}</p>
                            </li>
                            );
                        })}
                     </ul>    
                </div>
            );
        }
        else
            return(
                <div></div>
            );
    }

    const DishDetail = (props) => {
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                    <SubmitCommentForm />
                </div>
            </div>
            </div>
           
        );
    }
    
export default DishDetail;