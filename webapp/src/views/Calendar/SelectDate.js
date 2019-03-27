import React, { Component } from 'react';
import { Button, ButtonDropdown, Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import {Link} from "react-router-dom";


class SelectDate extends Component {

    
  constructor(props){
    super(props);

    // handle date (month,year)
    this.handleClickDeparture = this.handleClickDeparture.bind(this);
    this.handleClickDestination = this.handleClickDestination.bind(this);
   
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(2).fill(false),
      destinationName: "",
      destinationCode: "",
      departureName: "",
      departureCode: "",
     
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i)? !element : false ; });
    this.setState({
      dropdownOpen: newArray,

    });
  }

  handleClickDeparture(event) {

    //this.setState({departureName: event.target.name});
    //this.setState({ departureCode: event.target.value});
    this.setState({
        departureName: event.target.name,
        departureCode: event.target.value,
    });
    event.preventDefault();
  }

  handleClickDestination(event) {
    this.setState({
      destinationName: event.target.name,
      destinationCode: event.target.value,
    });
    event.preventDefault();
  }

  
  
   render() {
      return (
            <div className="airports">
            <Card>
                <Col>
                    
                    <CardHeader>
                        <i className="fa fa-align-justify"></i><strong>Travel Date</strong>
                    </CardHeader>
            
                    <CardBody >
                        <p>Select the date, month and year, of your travel</p>
                        
                        <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }} >
                        
                            <DropdownToggle  sm={{ size: '6', offset: 1 }} caret color="primary">
                                Month
                            </DropdownToggle>
                            
                            <div id="departure-dropdown">
                                <DropdownMenu right>
                                    <ul>
                                        <li><Button color="link"  block name="Philadelphia, PA: Philadelphia International" value="PHL" onClick={this.handleClickDeparture}>Philadelphia, PA: Philadelphia International</Button></li>  
                                        <li><Button color="link"  block name=" American Hour Rapid" value="AA" onClick={this.handleClickDeparture}> American Hour Rapid </Button></li>                            
                                    </ul> 
                                </DropdownMenu>
                            </div>
                        </ButtonDropdown>
                        
                        <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[1]} toggle={() => { this.toggle(1); }}>
                            
                            <DropdownToggle  sm={{ size: '6', offset: 1 }} caret color="success">
                                Year
                            </DropdownToggle>

                            <DropdownMenu right>
                              {this.state.routes.map((route) => {
                                let string = qs.parseUrl(route);
                                  return (
                                    <NavLink to={`${this.props.match.url}/${string.query.destination}`}>
                                      <ListGroupItem key={`${string.query.destination}`} tag='button' action>{`${string.query.destination}`}</ListGroupItem>
                                    </NavLink>) 
                              })}
                            </DropdownMenu>
                        </ButtonDropdown>

                    </CardBody>
                </Col>
            </Card>
        </div>
      );
    }
  }
  
  export default SelectDate;
  