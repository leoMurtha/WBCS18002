import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button} from 'reactstrap';
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
        console.log(this.state);
        return (
            <div className="animated fadeIn">
                <ListGroup flush>
                    {this.state.airports.map((airport) => {
                        console.log(airport);
                        return (
                            <ListGroupItem tag='button' action>{`${airport.code}`}
                                <Button tag={Link} to={`/${airport.name}`}>{airport.name}</Button>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </div>
        );
    }
}

export default Carrier;