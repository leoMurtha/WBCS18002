import React, { Component } from 'react';
import {
	Jumbotron,
	CardBody,
	Card,
	CardFooter,
	Button,
	CardHeader,
	Row,
	Col,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
} from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import qs from 'query-string';


const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
];

class Airports extends Component {
	_isMounted = false;


	constructor(props) {
		super(props);

		this.state = {
			departureOptions: null,
			routesOptions: null,
			airports: [],
			selectedAirport: null,
			selectedRoute: null,
		};

	}

	loadRoutes = (selectedAirport) => {
		this.setState({ selectedAirport: selectedAirport });
		console.log(`Option selected:`, selectedAirport);
		let url = `/airports/${selectedAirport.value}/routes`;
		axios.get(url)
			.catch((err) => {
				console.error(err);
			})
			.then(res => {
				this.setState({
					routesOptions: res.data.routes.map((route) => {
						let string = qs.parseUrl(route);
						return { 'value': string.query.destination, 'label': string.query.destination }
					})
				});
				//console.error(this.state.routesOptions);
			});
	}

	changeRoute = (selectedRoute) => { this.setState({ selectedRoute: selectedRoute }) }

	componentWillMount() {
		this._isMounted = false;
		axios.defaults.baseURL = 'http://trvl.hopto.org:8000/api/';
	}

	componentDidMount() {
		this._isMounted = true;
		let url = `/airports/`;
		axios.get(url)
			.catch((err) => {
				console.error(err);
			})
			.then(res => {
				if (this._isMounted) {
					this.setState({ airports: res.data });
					this.setState({ departureOptions: [...new Set(this.state.airports.map(airport => airport.code))].map(option => ({ 'value': option, 'label': option })) });
					console.log(this.state.departureOptions);
				}
			});
	}


	render() {

		// Waiting for the airport list to be loaded
		console.log(this.state.departureOptions);
		console.error(this.selectedRoute);

		if (this.state.departureOptions) {
			return (
				<div className="animated fadeIn">
					<Jumbotron>
						<Card className="card-accent-danger">
							<CardHeader>
								<strong>Select Route</strong>
							</CardHeader>
							<CardBody>
								<Col>
									<Select
										value={this.state.selectedAirport}
										onChange={this.loadRoutes}
										options={this.state.departureOptions}
										placeholder={<i className="fa fa-paper-plane">  Departure </i>}
									/>
								</Col>
								<Col className='mt-2'>
									{this.state.routesOptions
										? <Select
											value={this.state.selectedRoute}
											onChange={this.changeRoute}
											options={this.state.routesOptions}
											placeholder={<i className="fa fa-paper-plane">  Destination </i>}
										/>
										:
										<Select
											placeholder={<i className="fa fa-paper-plane-o">  Select Departure First</i>}
											isDisabled
										/>
									}
								</Col>
							</CardBody>
							<CardFooter className='text-center'>
								<Button tag={Link} type="checkroute" outline color="danger" size="md"
									block disabled={!(this.state.selectedAirport && this.state.selectedRoute)}
									to={`/airports/${this.state.selectedAirport ? this.state.selectedAirport.value : null}/routes/${this.state.selectedRoute ? this.state.selectedRoute.value : null}`}
								>
									<i className="icon-location-pin"></i> Check Route
								</Button>
							</CardFooter>
						</Card>
					</Jumbotron>
				</div>
			);
		} else {
			return (<div className="animated fadeIn"></div>);;
		}

	}
}

export default Airports;
