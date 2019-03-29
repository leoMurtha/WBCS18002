import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button, ButtonGroup } from 'reactstrap';
import axios from 'axios';

class Carriers extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      carriers: [],
    }
  }
  componentWillMount() {
    this._isMounted = false;
    axios.defaults.baseURL = 'http://trvl.hopto.org:8000/api/';

  }
  componentDidMount() {
    this._isMounted = true;

    let url = `carriers/`;

    axios.get(url)
      .then(res => {
        if (this._isMounted) {
          this.setState({'carriers': res.data});

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
          {this.state.carriers.map((carrier) => {
            return (
              <ListGroupItem key={carrier.code} tag='button' action>
                <Button outline color="primary" tag={Link} to={`/carriers/${carrier.code}`}>{carrier.code}</Button>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    );
  }
}

export default Carriers;