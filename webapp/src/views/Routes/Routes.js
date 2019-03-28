import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import axios from 'axios';
import qs from 'query-string';


class Routes extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      airport: {},
      url: null,
      routes: [],
    }
  }
  componentWillMount() {
    this._isMounted = false;
    axios.defaults.baseURL = 'http://trvl.hopto.org:8000/api/';
    //axios.defaults.timeout = 3500;
  }
  componentDidMount() {
    this._isMounted = true;

    let url = `airports/${this.props.match.params.id}/routes/`;

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
    return (
      <div className="animated fadeIn">
        <ListGroup flush>
          {this.state.routes.map((route) => {
            console.log(this.props.match);
            let string = qs.parseUrl(route);
            return (
              <ListGroupItem key={`${string.query.destination}`} tag='button' action>
                <Button outline color="primary" tag={Link} to={`${this.props.match.url}${string.query.destination}`}>{string.query.destination}</Button>
              </ListGroupItem>)
          })}
        </ListGroup>
      </div>
    );
  }
}

export default Routes;
