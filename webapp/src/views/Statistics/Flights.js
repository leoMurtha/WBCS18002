import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button, ButtonGroup } from 'reactstrap';
import axios from 'axios';

class Flights extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      carriers: {},
      flights_statistics : [],
    }
  }
  componentWillMount() {
    this._isMounted = false;
    axios.defaults.baseURL = 'http://trvl.hopto.org:8000/api/';

  }
  componentDidMount() {
    this._isMounted = true;

    console.log(this.props.match);

    let url = `carriers/${this.props.match.params.carrier}/statistics/?type=flights&airport=${this.props.match.params.airport}`;

    axios.get(url)
      .then(res => {
        if (this._isMounted) {
          this.setState(res.data);

        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    console.log(this.props.match);
    return (
      <div className="animated fadeIn">
        <ListGroup flush>
          {this.state.flights_statistics.map((fs) => {
            return (
              <ListGroupItem key={`${fs.date.month}-${fs.date.year}`} tag='button' action>
                <Button outline color="primary" tag={Link} to={`/airports/${fs.airport}`}>{`${fs.statistics.id}-${fs.date.month}-${fs.date.year}`}</Button>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    );
  }
}

export default Flights;