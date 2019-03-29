import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Jumbotron, Button, Container, Row, Col, CardFooter } from 'reactstrap';
import axios from 'axios';

class Route extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      airport: {},
      url: null,
      destination: {},
      carriers: [],
    }
  }

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
  }

  render() {
    //this.setState();
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <h4><i className="fa fa-paper-plane"></i>  <strong>Airport Details</strong></h4>
          </CardHeader>
          <CardBody>
            <Jumbotron fluid>
              <Container fluid>
                <h4 className="display-3 text-center"><strong>{this.props.match.params.id} <i className="icon-location-pin"></i> {this.props.match.params.destination}</strong></h4>
                <p className="lead text-center">Information about the selected airports.</p>
                <hr></hr>
                <Row>
                  <Col>
                    <Card key={`card${this.state.airport.code}`} className="text-white bg-primary">
                      <CardHeader>
                        {this.state.airport.name}
                      </CardHeader>
                      <CardBody>
                        {this.state.airport.code}
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card key={`card${this.state.destination.code}`} className="text-white bg-danger">
                      <CardHeader>
                        {this.state.destination.name}
                      </CardHeader>
                      <CardBody>
                        {this.state.destination.code}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <h3 className="mt-2 mb-2 text-center display-4"><strong>Route Carriers</strong></h3>
                <CardBody>
                  <Row>
                    {this.state.carriers.map((carrier, id) => {
                      return (
                        <Col key={id} xs="12" sm="6" md="4">
                          <Card className="border-primary">
                            <CardHeader> {carrier.name} <strong>{carrier.code}</strong>
                            </CardHeader>
                            <CardBody>
                              <p><strong>Carrier Mean Time Delay:</strong> {carrier.statistics.delay_time.carrier.mean}</p>
                              <hr></hr>
                              <p><strong>Carrier Mean Number of Delays:</strong> {carrier.statistics.delay_count.carrier.mean}</p>
                            </CardBody>
                            <CardFooter className='text-center'>
                              {/* <Button className="mr-5" outline color="danger" tag={Link} to={`/carriers/${carrier.code}`} size="md">Carrier Details</Button> */}
                              <Button outline color="danger" tag={Link} to={`${this.props.match.url}/carrier/${carrier.code}`} size="md">Statistics</Button>
                            </CardFooter>
                          </Card>
                        </Col>
                      )
                    })}
                  </Row>
                </CardBody>
              </Container>
            </Jumbotron>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Route;
