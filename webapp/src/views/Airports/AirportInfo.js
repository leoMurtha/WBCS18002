import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, Fade, Row  } from 'reactstrap';
import {Link} from "react-router-dom";
import axios from 'axios';


class AirportInfo extends Component {
  
  constructor(props){
    super(props);
    
 //   this.toggleCustom = this.toggleAccordion.bind(this);
    
   
    this.state = {
        collapse: false,
        accordion: new Array(1000).fill(false),
        custom: [true, false],
        status: 'Closed',
        fadeIn: true,
        timeout: 300,
        id: this.props.match.params.id,
        data:{
          airport: {
            code: null,
            name: null,
            url: null,
            routes: null,
            },
          carriers: []  

        }

     
    };

    const state = this.state.accordion.map((index) =>  { return (index === 0)? true : false ; });
    this.setState({ accordion: state});
  }

  componentWillMount() {
    this._isMounted = false;
    axios.defaults.baseURL = 'http://trvl.hopto.org:8000/api/';
    //axios.defaults.timeout = 1500;
  }

  componentDidMount() {
    this._isMounted = true;
    let url = `/airports/${this.state.id}`;
    axios.get(url)
      .catch((err) => {
        console.error(err);
      })
      .then(res => {
        if (this._isMounted) {
          this.setState( {data: res.data});
        }
      });
  }


  
   render() {

    const items = []
    
    for (var index=0; index<this.state.data.carriers.length; index++)
        {
      //    console.log(index);
      items.push(
      <li>
            <CardHeader >
              
                  <h5 className="m-0 p-0">{this.state.data.carriers[index].name}, {this.state.data.carriers[index].code}</h5>
              
            </CardHeader>
                   
                      <CardBody>
                      <div>Carrier: {this.state.data.c}</div>
                      <div>Code: {this.state.data.carriers[index].code} </div>
                      <div>Url: {this.state.data.carriers[index].url}</div>
                      <div>routes: {this.state.data.carriers[index].routes} </div> 
                      </CardBody>
                      <Col sm={{ size: '2', offset: 10 }}>
                      <Link to={`/statistics/flights/${this.state.data.airport.code}&${this.state.data.carriers[index].code}`}>
                        <Button color="info">Statistics</Button>
                      </Link>  
                      </Col>
                   
                    </li>
      )  
      } 


      return (
        <div className="airport">
            <Card>
            <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Information of {this.state.id} </strong>
              </CardHeader>
                
                <CardBody>
                <h4>Name: {this.state.data.airport.name}</h4>
                <h4>Code: {this.state.data.airport.code} </h4>
                <h4>List of Carriers:</h4>
                <div id="accordion">
                  <Card className="mb-0">
                  
                  <ul>
                      {items}
                  </ul> 
                  </Card>
                  
                </div>
              </CardBody>
            </Card>
        </div>
          

      );
    }
  }
  
  export default AirportInfo;
  