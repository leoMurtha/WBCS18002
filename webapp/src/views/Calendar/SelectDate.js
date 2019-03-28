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

var years = ["2000", "2001", "2002", "2003"]

class SelectDate extends Component {


  constructor(props) {
    super(props);

    this.state = {
      url_departure: null,
      url_destination: null,
      carrier: {},
      minimal_statistics: [],
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

          var months = []
          var years = []
          res.data.minimal_statistics.forEach(statistic => {
            if (!months.includes(statistic.date.month)) {
              months.push(statistic.date.month)
            }
            if (!years.includes(statistic.date.year)) {
              years.push(statistic.date.year)
            }
          });
          this.setState({months: months.sort()})
          this.setState({years: years.sort()})
          
          console.warn(this.state.months);
          console.warn(this.state.years);
        }
      });

    //console.log(this.state);
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
    console.log(this.state.years);

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
                    {console.log(this.state.months)}
                    {this.state.months.map(month => (
                      <option>{month}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <Label htmlFor="ccyear">Year</Label>
                  <Input type="select" name="ccyear" id="ccyear">
                    {this.state.years.map(year => (
                      <option>{year}</option>
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
