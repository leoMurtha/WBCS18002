import React, { Component } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

//import Select from 'react-select';

const canlendar_months = {
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

var years = [2000,2001,2002,2003]

class SelectDate extends Component {
  
    
  constructor(props){
    super(props);

    this.state = {
      airports: [], 
      carrier: null,
      url_departure: null,
      url_destination: null,
      months: [],
      years: [],
    };
  }

  componentWillMount() {
    this._isMounted = false;
    axios.defaults.baseURL = 'http://trvl.hopto.org:8000/api/';
  }

  componentDidMount() {
    this._isMounted = true;

    let url_departure = `carriers/${this.props.match.params.carrier}/statistics?type=minimal&aiport=${this.props.match.params.id}`;
    //let url_destination = `carriers/${this.props.match.params.carrier}/statistics?type=minimal&aiport=${this.props.match.params.destination}`;
    
    axios.get(url_departure)
      .catch((err) => {
        console.error(err);
      })
      .then(res => {
        if (this._isMounted) {
          this.setState(res.data);
        }
      });
    
  }

  triggerDropdown(){

    var already = {};
    var sel = document.getElementById('years_listing');

    for (var i = 0; i < years.length; i++) 
    {
      var val = years[i];

      if (! already[val]) 
      {
        var opt = document.createElement('option');
        opt.innerHTML = val;
        opt.value = val;
        sel.appendChild(opt);

        already[val] = true;
      }
    }
};
  
  
   render() {

      return (
            <div className="airports">
            <Card>
              <CardHeader>
                <strong>Credit Card</strong>
                <small> Form</small>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccmonth">Month</Label>
                      <Input type="select" name="ccmonth" id="ccmonth">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccyear">Year</Label>
                      <Input type="select" name="ccyear" id="year">
                        <select id="years"></select>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
        </div>
      );
    }
  }
  
  export default SelectDate;
  