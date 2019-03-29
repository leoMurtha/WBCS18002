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
  Row,
} from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';


//import Select from 'react-select';

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
};


class SelectDate extends Component {

  bar = {
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

  constructor(props) {
    super(props);

    this.state = {
      departure_data: {},
      destination_data: {},

      departure_bar: [],
      destination_bar: [],

      carrier: {},
      months: [],
      years: [],
      selected_month: null,
      selected_year: null,
    };




    //this.setState({ departure_bar: bar });
    //this.setState({ destination_bar: bar });

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

    let departure_url = `carriers/${this.props.match.params.carrier}/statistics/?type=minimal&airport=${this.props.match.params.id}`;

    axios.get(departure_url)
      .catch((err) => {
        console.error(err);
      })
      .then(res => {
        if (this._isMounted) {
          this.setState({ departure_data: res.data.minimal_statistics });

          //console.log(this.state.departure_data)
          // extracting months from data
          //var months = this.state.departure.data.map(statistic => statistic.date.month);
          //months = [...new Set(months)];
          //months = months.map(month => ({ 'value': month, 'label': month }));
          //this.setState({ months: months.sort(this.sortNumber) });
          //this.setState({ selected_month: months[0] })

          // extracting years from data
          var years = this.state.departure_data.map(statistic => statistic.date.year);
          years = [...new Set(years)];
          years = years.map(year => ({ 'value': year, 'label': year }));
          this.setState({ years: years.sort(this.sortNumber) });
          this.setState({ selected_year: years[0] })

          this.calculateMonths(years[0].value)

          let destination_url = `carriers/${this.props.match.params.carrier}/statistics?type=minimal&airport=${this.props.match.params.destination}`;

          axios.get(destination_url)
            .catch((err) => {
              console.error(err);
            })
            .then(res_d => {
              if (this._isMounted) {
                this.setState({ destination_data: res_d.data.minimal_statistics });


              }
            });

          this.calculateBarChart()
        }
      });




    //console.log(this.state);
  }

  changeMonth = (selected_month) => {
    this.setState({ selected_month: selected_month });
    //console.log(this.state.selected_month);
  }

  calculateMonths = (year) => {
    var list = this.state.departure_data.filter(obj => obj.date.year == year)
    console.log(list)
    var months = list.map(obj => obj.date.month)
    months = [...new Set(months)];
    months = months.map(month => ({ 'value': month, 'label': month }));
    this.setState({ months: months.sort(this.sortNumber) });
    this.setState({ selected_month: months[0] })
  }

  changeYear = (selected_year) => {
    this.setState({ selected_year: selected_year });
    //console.log(this.state.selected_year);

    this.calculateMonths(selected_year.value)

  }


  jsonCopy = (src) => {
    return JSON.parse(JSON.stringify(src));
  }

  departureBarChart = (date) => {
    var obj = this.state.departure_data.find(obj => obj.date.month == date.month && obj.date.year == date.year)
    var data = [obj.statistics.cancelled, obj.statistics.on_time, obj.statistics.delayed]

    const new_bar = this.jsonCopy(this.bar)
    new_bar.datasets[0].data = data
    console.log(data)
    console.log(new_bar)
    this.setState({ departure_bar: new_bar })
    //this.states.departure_bar['datasets'][0]['data'] = data
    //this.forceUpdate()

  }

  destinationBarChart = (date) => {
    var obj_dest = this.state.destination_data.find(obj => obj.date.month == date.month && obj.date.year == date.year)
    var data_dest = [obj_dest.statistics.cancelled, obj_dest.statistics.on_time, obj_dest.statistics.delayed]

    const new_bar = this.jsonCopy(this.bar)
    new_bar.datasets[0].data = data_dest
    console.log(data_dest)
    console.log(new_bar)
    this.setState({ destination_bar: new_bar })
  }

  calculateBarChart = () => {

    //console.log(this.state.selected_month);
    //console.log(this.state.selected_year);

    // loading selected dates from selects
    var date = { month: this.state.selected_month.value, year: this.state.selected_year.value }
    this.departureBarChart(date)
    this.destinationBarChart(date)


    // loading selected dates from selects


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
                  value={this.state.selected_year}
                  options={this.state.years}
                  onChange={this.changeYear}
                  placeholder="Choose a Year..."
                />
              </Col>
              <Col xs='4'>
                <Select
                  value={this.state.selected_month}
                  options={this.state.months}
                  onChange={this.changeMonth}
                  placeholder="Choose a Month..."
                />
              </Col>

              <Col col="4" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-primary" onClick={this.calculateBarChart}>Confirm</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <CardColumns className="cols-2">
          <Card>
            <CardHeader>
              {this.props.match.params.id}
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={this.state.departure_bar} options={options} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              {this.props.match.params.destination}
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={this.state.destination_bar} options={options} />
              </div>
            </CardBody>
          </Card>
        </CardColumns>

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
