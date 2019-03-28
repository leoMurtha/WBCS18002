import React, { Component } from 'react';
import { Button, ButtonDropdown, Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import qs from 'query-string';
import Select from 'react-select';

const CALENDAR_MONTHS = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec"
}

class SelectDate extends Component {

  
    
  constructor(props){
    super(props);

    // handle date (month,year)
    //this.handleClickDeparture = this.handleClickDeparture.bind(this);
    //this.handleClickDestination = this.handleClickDestination.bind(this);
   
    //this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(2).fill(false),
      destinationName: "",
      destinationCode: "",
      departureName: "",
      departureCode: "",
      airport: {},
      url: null,
      routes: [],
    };
  }

  componentWillMount() {
    this._isMounted = false;
    axios.defaults.baseURL = 'http://trvl.hopto.org:8000/api/';
    //axios.defaults.timeout = 1500;
  }

  componentDidMount() {
    this._isMounted = true;

    let url = `carriers/${this.props.match.params.id}/statistics`;

    axios.get(url)
      .catch((err) => {
        console.error(err);
      })
      .then(res => {
        if (this._isMounted) {
          this.setState(res.data);
          this.setState({id: res.id})
        }
      });
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
                                    <ListGroupItem tag='button' action>{`${string.query.destination}`}</ListGroupItem>
                                    )
                                }
                              )}
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
  