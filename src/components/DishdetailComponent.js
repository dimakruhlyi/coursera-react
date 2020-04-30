import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class SubmitCommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        // console.log("Current State is: ", JSON.stringify(values));
        // alert("Current State is: " + JSON.stringify(values));
        this.props.addComment(this.props.dishId,  values.rating, values.author, values.comment);
    }

    render() {
        return (
            <>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col md="12">
                            <Label>Rating</Label>
                            </Col>
                            <Col md="12">
                                <Control.select model=".rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>    
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md="12">
                                <Label>Your Name</Label>
                            </Col>
                            <Col md="12">
                                <Control.text model=".author" name="author" className="form-control"
                                id="author"
                                placeholder="Your Name"
                                validators={{
                                    minLength: minLength(3),
                                    maxLength: maxLength(15)
                                }}
                                />
                                <Errors className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md="12">
                                <Label>Comment</Label>
                            </Col>
                            <Col md="12">
                                <Control.textarea model=".comment" name="comment"
                                id="comment"
                                className="form-control"
                                rows="6" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md="12">
                                <Button type="submit" color="success">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            <button onClick={this.toggleModal}>
                <span className="fa fa-pencil"></span> Submit Comment
            </button>
            </>
        );
    }
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

    function RenderComments({comments, addComment, dishId}){
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
                     <SubmitCommentForm dishId={dishId} addComment={addComment} /> 
                </div>
            );
        }
        else
            return(
                <div></div>
            );
    }

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
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
                        <RenderComments comments={props.comments} addComment={props.addComment}
                            dishId={props.dish.id}/>
                    </div>
                </div>
                </div>
            
            );
            else 
                return(
                    <div></div>
                );
    }
    
export default DishDetail;