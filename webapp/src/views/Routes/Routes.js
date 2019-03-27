import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';
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
        console.log(res);
        //if (this._isMounted) {
        //  this.setState(res.data);
        //}
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    console.log(this.state);
    return (
      <div className="animated fadeIn">
        <ListGroup flush>
          {this.state.routes.map((route) => {
            let string = qs.parseUrl(route);
            return (
              <NavLink key={`${string.query.destination}`} to={`routes/${string.query.destination}`}>
                <ListGroupItem tag='button' action>{`${string.query.destination}`}</ListGroupItem>
              </NavLink>)
          })}
        </ListGroup>
      </div>
    );
  }
}

export default Routes;
