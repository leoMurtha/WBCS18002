import React, { Component } from 'react';
import { Badge, Card, CardHeader, CardBody, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import axios from 'axios';
import qs from 'query-string';

class AirportRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airport: {},
      url: null,
      destination: {},
      carriers: [],
    }
  }


  componentDidMount() {
    // const params = qs.parse(this.props.location.search);
    // console.log(params);

    // fetch(`http://trvl.hopto.org:8000/api/airports/${params.airport}/routes`, {
    // })
    //   .then(res => {
    //     console.log(res);
    //   });
    const mock = { "airport": { "code": "JFK", "name": "New York, NY: John F. Kennedy International", "url": "http://trvl.hopto.org:8000/api/airports/JFK/?format=json", "routes": "http://trvl.hopto.org:8000/api/airports/JFK/routes/" }, "url": "http://trvl.hopto.org:8000/api/airports/JFK/routes/?destination=SFO&carrier=OH&format=json", "destination": { "code": "SFO", "name": "San Francisco, CA: San Francisco International", "url": "http://trvl.hopto.org:8000/api/airports/SFO/?format=json" }, "carriers": [{ "code": "OH", "name": "Comair Inc.", "url": "http://trvl.hopto.org:8000/api/carriers/OH", "statistics": { "route": "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=SFO&carrier=OH", "delay_time": { "late_aircraft": { "mean": 0.0, "median": 0.0, "standard_deviation": 0.0 }, "carrier": { "mean": 7751.452380952381, "median": 7062.5, "standard_deviation": 4242.386509425028 } }, "delay_count": { "late_aircraft": { "mean": 0.0, "median": 0.0, "standard_deviation": 0.0 }, "carrier": { "mean": 6482.940476190476, "median": 5232.0, "standard_deviation": 4806.739515541324 } } } }] }// this.setState(mock);
    this.setState(mock);
    console.log(this.props.match.params);
    console.log(this.props.match);

  componentWillMount() {
    this._isMounted = false;
    axios.defaults.baseURL = 'http://trvl.hopto.org:8000/api/';
    //axios.defaults.timeout = 1500;
    //console.log('WILL');
  }

  componentDidMount() {
    this._isMounted = true;
    let url = `airports/${this.props.match.params.id}/routes?destination=${this.props.match.params.destination}`;
    axios.get(url)
      .catch((err) => {
        console.error(err);
      })
      .then(res => {
        if (this._isMounted) {
          this.setState(res.data);
        }
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> {`From ${this.state.airport.name} From ${this.state.destination.name}`}
          </CardHeader>
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Carrier</th>
                  <th>Code</th>
                  <th>Carrier Mean Time Delay</th>
                  <th>Carrier Mean Number of Delays</th>
                </tr>
              </thead>
              <tbody>
                {this.state.carriers.map((carrier, id) => {
                  return (
                    <tr key={id}>
                      <td>{carrier.name}</td>
                      <td>{carrier.code}</td>
                      <td>{carrier.statistics.delay_time.carrier.mean}</td>
                      <td>{carrier.statistics.delay_count.carrier.mean}</td>
                      
                      <td>
                        <Badge color="success">Active</Badge>
                      </td>
                  </tr>)    
                })}

              </tbody>
            </Table>
            <Pagination>
              <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
              <PaginationItem active>
                <PaginationLink tag="button">1</PaginationLink>
              </PaginationItem>
              <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
            </Pagination>
          </CardBody>
        </Card>

      </div>

    );
  }
}

export default AirportRoute;
