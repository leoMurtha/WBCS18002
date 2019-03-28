import React, { Component } from 'react';
import { Button, ButtonDropdown, Card, CardBody, CardHeader, Col, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { Route, Link } from "react-router-dom";
import axios from 'axios';
import qs from 'query-string';

class FindAirports extends Component {

  constructor(props) {
    super(props);
    this.handleClickDeparture = this.handleClickDeparture.bind(this);
    this.handleClickDestination = this.handleClickDestination.bind(this);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(2).fill(false),
      dropdownContent: new Array(1000).fill(
        {

          code: null,
          name: null,
          url: null,
        }),
      destinationName: null,
      destinationCode: "",
      destinationUrl: null,
      departureName: null,
      departureCode: "",
      departureurl: null,


    };
    this.items = [];
    this.items2 = [];
  }

  componentWillMount() {
    this._isMounted = false;
    axios.defaults.baseURL = 'http://trvl.hopto.org:8000/api/';
    //axios.defaults.timeout = 1500;
  }

  componentDidMount() {
    this._isMounted = true;
    let url = `/airports/`;
    axios.get(url)
      .catch((err) => {
        console.error(err);
      })
      .then(res => {
        if (this._isMounted) {
          this.setState({ dropdownContent: res.data });
        }
        for (var index = 0; index < this.state.dropdownContent.length; index++) {
          console.log(this.state.dropdownContent[index].name);
          this.items.push(<li key={this.state.dropdownContent[index].code}><Button color="link" block name={this.state.dropdownContent[index].name} value={this.state.dropdownContent[index].code} onClick={this.handleClickDeparture}>{this.state.dropdownContent[index].name}</Button></li>)
          this.items2.push(<li key={this.state.dropdownContent[index].code}><Button color="link" block name={this.state.dropdownContent[index].name} value={this.state.dropdownContent[index].code} onClick={this.handleClickDestination}>{this.state.dropdownContent[index].name}</Button></li>)
        }
      });


  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i) ? !element : false; });
    // const ContentArray = [{name:"Philadelphia, PA: Philadelphia International", code:"PHL", url:null},{name:"American Hour Rapid", code:"AHR", url:null}];


    this.setState({
      dropdownOpen: newArray,
      // dropdownContent: ContentArray,
    });
  }

  handleClickDeparture(event) {
    this.setState({ departureCode: event.target.value })
    this.setState({ departureName: event.target.name });


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
              <i className="fa fa-align-justify"></i><strong>Airports</strong>
            </CardHeader>
            <CardBody >
              <p>Select the airport of your <code>departure</code> and the one of your <code>destination</code></p>
              <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }} >
                <DropdownToggle sm={{ size: '6', offset: 1 }} caret color="primary">
                  Departure
                  </DropdownToggle>
                <div id="departure-dropdown">
                  <DropdownMenu right style={{ overflowY: 'scroll', maxHeight: (window.innerHeight - (this.myRef ? (this.myRef.getBoundingClientRect().top + this.myRef.getBoundingClientRect().height + 100) : 200)) }}>
                    <ul>
                      {this.items}
                    </ul>
                  </DropdownMenu>
                </div>
              </ButtonDropdown>
              <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[1]} toggle={() => { this.toggle(1); }}>
                <DropdownToggle sm={{ size: '6', offset: 1 }} caret color="success">
                  Destination
                  </DropdownToggle>
                <DropdownMenu right style={{ overflowY: 'scroll', maxHeight: (window.innerHeight - (this.myRef ? (this.myRef.getBoundingClientRect().top + this.myRef.getBoundingClientRect().height + 100) : 200)) }}>
                  <ul>
                    {this.items2}
                  </ul>
                </DropdownMenu>
              </ButtonDropdown>

            </CardBody>
          </Col>



          <Row>
            <Col sm={{ size: '6', offset: 1 }}>
              <Card>
                <CardHeader>
                  <i className="fa fa-plane"></i><strong>Airport for Departure</strong>
                </CardHeader>
                <CardBody>

                  <div>Name: {this.state.departureName}</div>
                  <div>Code: {this.state.departureCode} </div>
                  <Col sm={{ size: 6, order: 2, offset: 10 }}>
                    <div className="departure-button">
                      <Link to={`airports/${this.state.departureCode}`}>
                        <Button color="warning" disabled={!this.state.departureName}>Details</Button>
                      </Link>

                    </div>
                  </Col>

                </CardBody>

              </Card>
            </Col>
            <Col sm={{ size: '6', offset: 1 }}>
              <Card>
                <CardHeader>
                  <i className="fa fa-plane"></i><strong>Airport Destination</strong>
                </CardHeader>
                <CardBody>
                  <div>Name: {this.state.destinationName}</div>
                  <div>Code: {this.state.destinationCode} </div>
                  <Col sm={{ size: 6, order: 2, offset: 10 }}>
                    <div className="destination-button">

                      <Link to={`airports/${this.state.destinationCode}`}>
                        <Button color="warning" disabled={!this.state.destinationName}>Details</Button>

                      </Link>


                    </div>
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Link to={`airports/${this.state.departureCode}/routes/${this.state.destinationCode}`}>
            <Button outline color="danger" size="lg" block disabled={!this.state.departureName}>Find Route</Button>
          </Link>
        </Card>

      </div>


    );
  }
}

export default FindAirports;
