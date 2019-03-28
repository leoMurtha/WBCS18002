import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button, ButtonGroup } from 'reactstrap';
import axios from 'axios';
import qs from 'query-string';


class Carrier extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            carrier: {},
            airports: [],
        }
    }
    componentWillMount() {
        this._isMounted = false;
        axios.defaults.baseURL = 'http://trvl.hopto.org:8000/api/';

    }
    componentDidMount() {
        this._isMounted = true;

        let url = `carriers/${this.props.match.params.carrier}/`;

        axios.get(url)
            .then(res => {
                if (this._isMounted) {
                    this.setState(res.data);
                    console.log(res.data);
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
                    {this.state.airports.map((airport) => {
                        return (
                            <ListGroupItem key={airport.code} tag='button' action>
                                <ButtonGroup >
                                    <Button outline color="primary" tag={Link} to={`/airports/${airport.code}`}>{airport.code}</Button>

                                    <Button outline color="danger" tag={Link} to={`${this.props.match.url}/statistics?type=minimal&airport=${airport.code}`}>Statistics</Button>
                                </ButtonGroup>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </div>
        );
    }
}

export default Carrier;