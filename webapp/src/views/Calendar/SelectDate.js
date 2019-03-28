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
import Bar from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
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

const bar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
};


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

  sortNumber(a, b) {
    return a - b;
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
          this.setState({ months: months.sort(this.sortNumber) })
          this.setState({ years: years.sort(this.sortNumber) })

          //console.warn(this.state.months);
          //console.warn(this.state.years);
        }
      });

    //console.log(this.state);
  }


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

        <Card>
          <CardHeader>
            Bar Chart
              <div className="card-header-actions">
              <a href="http://www.chartjs.org" className="card-header-action">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <div className="chart-wrapper">
              <Bar data={bar} options={options} />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SelectDate;
