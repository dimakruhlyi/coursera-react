import React, { Component } from 'react';
import { Card, CardImg,  CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    renderDish(dish) {
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

    renderComments(dish){
        if (dish != null){
            const comm = dish.comments.map((dish) => {
                return(
                    <li key = {dish.id}>
                        <p> {dish.comment} </p>
                        <p>-- {dish.author}, {new Intl.DateTimeFormat("en-GB", {
                                                year: "numeric",
                                                month: "long",
                                                day: "2-digit",
                                                }).format(new Date(dish.date))}</p>
                    </li>
                );
            });
            return(
                <div className="col-12  m-1">
                     <h4>Comments</h4>
                     <ul className = "list-unstyled"> {comm}</ul>
                </div>
            );
        }
        else
            return(
                <div></div>
            );
    }

    render(){
        return (
            <div className="row">
                {this.props.menu}
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                  </div>
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.selectedDish)}
                  </div>

            </div>
        );
    }

}

export default DishDetail;