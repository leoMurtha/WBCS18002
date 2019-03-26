import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import qs from 'query-string';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airport: {},
      url: null,
      routes: [],
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
    const mock = { "airport": { "code": "JFK", "name": "New York, NY: John F. Kennedy International", "url": "http://trvl.hopto.org:8000/api/airports/JFK/?format=json", "routes": "http://trvl.hopto.org:8000/api/airports/JFK/routes/" }, "url": "http://trvl.hopto.org:8000/api/airports/JFK/routes/?format=json", "routes": ["http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=SFO", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=PHL", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=PHX", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=ORD", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=PDX", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=BOS", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=LGA", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=MCO", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=DCA", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=EWR", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=TPA", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=IAH", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=SAN", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=ATL", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=MSP", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=DEN", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=FLL", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=LAX", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=MIA", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=DFW", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=IAD", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=BWI", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=SEA", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=LAS", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=DTW", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=CLT", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=SLC", "http://trvl.hopto.org:8000/api/airports/JFK/routes?destination=MDW"] };
    this.setState(mock);
    console.log(this.props.match.params);
    console.log(this.props.match);
  }

  render() {
    return (
      <div className="animated fadeIn">    
        <ListGroup flush>
          {this.state.routes.map((route) => {
            let string = qs.parseUrl(route);
            return (
            <NavLink to={`${this.props.match.url}/${string.query.destination}`}>
              <ListGroupItem key={`${string.query.destination}`} tag='button' action>{`${string.query.destination}`}</ListGroupItem>
            </NavLink>) 
          })}
        </ListGroup>
      </div>      
    );
  }
}

export default Routes;
