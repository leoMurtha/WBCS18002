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


  }
  componentDidMount() {
    this._isMounted = true;
    axios.defaults.baseURL = 'http://trvl.hopto.org:8000/api/airports';

    let url = ``;

    axios.options(url)
      .then(res => {
        if (this._isMounted) {
          console.log(res);
          this.setState(res.data);
          //this.setState({ id: res.id })
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
