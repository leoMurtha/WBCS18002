import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import { Badge, Card, CardHeader, CardBody, Table, Pagination, PaginationItem, PaginationLink, NavLink, Button } from 'reactstrap';
import axios from 'axios';

class AirportRoute extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      airport: {},
      url: null,
      destination: {},
      carriers: [],
      urlcurr: this.props.location.pathname
    }
 
    //this.routeChange = this.routeChange.bind(this);
  }

  // routeChange(path) {
  //   this.props.history.push(path);
  // }


  componentWillMount() {
    this._isMounted = false;
    axios.defaults.baseURL = 'http://trvl.hopto.org:8000/api/';
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

      //console.log(this.props.location.pathname);
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
                  <th> </th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {this.state.carriers.map((carrier, id) => {
                  return (
                    <tr key={id}>
                      <td>{carrier.name}</td>
                      <td><Button tag={Link} to={`/${carrier.code}`}>{carrier.code}</Button></td>
                      <td>{carrier.statistics.delay_time.carrier.mean}</td>
                      <td>{carrier.statistics.delay_count.carrier.mean}</td>

                      <td>
                        <Badge color="success">Active</Badge>
                      </td>
                      <td>
                      <Link to={`${this.state.urlcurr}/carrier/${carrier.code}`} >                        
                        <Button outline color="danger" size="lg" block >Select Date</Button>
                      </Link>

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
