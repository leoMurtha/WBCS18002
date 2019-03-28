import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardColumns,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { Bar } from 'react-chartjs-2';
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
      bar: null,
      selected_month: null,
      selected_year: null,
    };

    this.state.bar = {
      labels: ["Cancelled", "On time", "Delayed"],
      datasets: [
        {
          label: 'Airline Statistics',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [0, 0, 0],
        },
      ],
    };
  }

  componentWillMount() {
    this._isMounted = false;
    axios.defaults.baseURL = 'http://trvl.hopto.org:8000/api/';
  }

  sortNumber(a, b) {
    return a['value'] - b['value'];
  }

  componentDidMount() {
    this._isMounted = true;

    let url_departure = `carriers/${this.props.match.params.carrier}/statistics/?type=minimal&airport=${this.props.match.params.id}`;
    //let url_destination = `carriers/${this.props.match.params.carrier}/statistics?type=minimal&aiport=${this.props.match.params.destination}`;
    console.log(url_departure)
    axios.get(url_departure)
      .catch((err) => {
        console.error(err);
      })
      .then(res => {
        if (this._isMounted) {
          this.setState(res.data);

          // extracting months from data
          var months = this.state.minimal_statistics.map(statistic => statistic.date.month);
          months = [...new Set(months)];
          months = months.map(month => ({ 'value': month, 'label': month }));
          this.setState({ months: months.sort(this.sortNumber) });
          this.setState({ selected_month: months[0].value})

          // extracting years from data
          var years = this.state.minimal_statistics.map(statistic => statistic.date.year);
          years = [...new Set(years)];
          years = years.map(year => ({ 'value': year, 'label': year }));
          this.setState({ years: years.sort(this.sortNumber) });
          this.setState({ selected_year: years[0].value})

        }
      });

    //console.log(this.state);
  }

  changeMonth = (selected_month) =>{
    this.setState({selected_month:selected_month.value});
    //console.log(this.state.selected_month);
  }

  changeYear = (selected_year) =>{
    this.setState({selected_year:selected_year.value});
    //console.log(this.state.selected_year);
  }

  calculateBarChart = () =>{
    // loading selected dates from selects
    console.log(this.state.selected_month);
    console.log(this.state.selected_year);

    var date = {month: this.state.selected_month,year: this.state.selected_year}
    let obj = this.state.minimal_statistics.find(obj => obj.date.month == date.month && obj.date.year == date.year)
    console.log(obj);

    var data = [obj.statistics.cancelled,obj.statistics.on_time,obj.statistics.delayed]
    this.setState({bar: {datasets:[{data: data}]}})

  }


  render() {


    return (
      <div className="airports">
        <Card>
          <CardHeader>
            <strong>Select date</strong>
            <small> Form</small>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs='4'>
                <Select
                  // value = {this.state.selected_month}}
                  options={this.state.months}
                  onChange={this.changeMonth}
                />
              </Col>
              <Col xs='4'>
                <Select
                  // value = {this.state.selected_year}
                  options={this.state.years}
                  onChange={this.changeYear}
                />
              </Col>
              <Col col="4" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-primary" onClick={this.calculateBarChart}>Confirm</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <div className="animated fadeIn">
          <CardColumns className="cols-2">
            <Card>
              <CardHeader>
                Statistics Chart
                <div className="card-header-actions">
                  <a href="http://www.chartjs.org" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Bar data={this.state.bar} options={options} />
                </div>
              </CardBody>
            </Card>
          </CardColumns>
        </div>
      </div>

    );
  }
}

export default SelectDate;



/*<Col xs="4">
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
  </Col>*/
