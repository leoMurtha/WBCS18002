import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import Select from 'react-select'
import axios from 'axios';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';


const select_options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
];


const options = {
	tooltips: {
		enabled: false,
		custom: CustomTooltips
	},
	maintainAspectRatio: false
}

class Flights extends Component {
	_isMounted = false;
	_year = null;
	constructor(props) {
		super(props);

		this.state = {
			carrier: {},
			flights_statistics: [],
		}
		const bar = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
				{
					label: 'My First dataset',
					backgroundColor: 'rgba(255,99,132,0.2)',
					borderColor: 'rgba(255,99,132,1)',
					borderWidth: 1,
					hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					hoverBorderColor: 'rgba(255,99,132,1)',
					data: [65, 59, 80, 81, 56, 55, 40],
				},
			],
		};
	}

	handleChange = (selectedOption) => {
		this._year = selectedOption;
		console.log(`Option selected:`, selectedOption);
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
					var years = this.state.flights_statistics.map(statistic => statistic.date.year);
					years = [...new Set(years)];
					years = years.map(year => ({'value': year, 'label':year}));
					
					this.setState({'years': years})
					console.log(this.state);
					
					console.log(this.state.years);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	render() {
		//this.setState(this.state); 
		return (
			<div className="animated fadeIn">
				<Select
					value={this.state.selectedOption}
					onChange={this.handleChange}
					options={this.state.years}
				/>
				
			</div >
		);
	}
}

export default Flights;