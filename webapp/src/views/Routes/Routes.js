import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import Frisbee from 'frisbee';
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
    
    this.api = new Frisbee({
      baseURI: 'http://trvl.hopto.org:8000/api/', // optional
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    // fetch('http://trvl.hopto.org:8000/api/airports', {
    //   method: "GET", // *GET, POST, PUT, DELETE, etc.
    //   mode: "cors", // no-cors, cors, *same-origin
    //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //   headers: {
    //     "Content-Type": "application/json",
    //     // "Content-Type": "application/x-www-form-urlencoded",
    //   }}).then(res => { console.log(res.json().then(data => {console.log(data)})) });

    // axios.get(url)
    //   .then(res => {
    //     if (this._isMounted) {
    //       this.setState(res.data);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }
  componentDidMount() {
    let url = `airports` ///${this.props.match.params.id}/routes`;
    
    this.api.get(url).then(console.log).catch(console.error);
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
