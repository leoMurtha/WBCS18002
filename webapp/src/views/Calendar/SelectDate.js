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

var canlendar_months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

var years = ["2000","2001","2002","2003"]

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
    
    console.log(this.state);
  }

//  triggerDropdown(){
//
//    var already = {};
//    var sel = document.getElementById('years_listing');
//
//    for (var i = 0; i < years.length; i++) 
//    {
//      var val = years[i];
//
//      if (! already[val]) 
//      {
//        var opt = document.createElement('option');
//        opt.innerHTML = val;
//        opt.value = val;
//        sel.appendChild(opt);
//
//        already[val] = true;
//      }
//    }
//};
  
  
render() {

      return (
        <div className="airports">
          <Card>
            <CardHeader>
              <strong>Fred Card</strong>
              <small> Form</small>
            </CardHeader>
          <CardBody>
            <Row>
              <Col xs="4">
                <FormGroup>
                  <Label htmlFor="ccmonth">Month</Label>
                      <Input type="select" name="ccmonth" id="ccmonth">
                        {canlendar_months.map(canlendar_months => (
                            <option>{canlendar_months}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccyear">Year</Label>
                      <Input type="select" name="ccyear" id="ccyear">
                        {years.map(years => (
                            <option>{years}</option>
                        ))}
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
  