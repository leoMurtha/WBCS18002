import React, { Component } from 'react';


class FindAirports extends Component {
  constructor(props){
    super(props);
    this.state = {
        
        departure : 'Ex:Miami',
        destination : 'Ex:New York',
    };

    this.handleChangeDeparture = this.handleChangeDeparture.bind(this);
    this.handleChangeDestination = this.handleChangeDestination.bind(this);
    this.FindRoute = this.FindRoute.bind(this);

  }

  handleChangeDeparture(e) {
    this.setState({departure: e.target.value});
  }

  handleChangeDestination(e) {
    this.setState({destination: e.target.value});
  }


  FindRoute(e){

    console.log("Hi");

  }


    render() {
      return (
        <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">Airports</div>
          <h1>Choose Route for Your Trip! </h1>
            <div className="container">
                <div className="departure">
                    <label>
                    Departure:
                    <input type="text" value={this.state.departure} onChange={this.handleChangeDeparture}/>
                    </label>
                </div>
                <div className="destination">
                    <label>
                    Destination:
                    <input type="text" value={this.state.destination} onChange={this.handleChangeDestination}/>
                    </label>
                </div>
            </div> 
             <div className="listRoutes">
             
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default FindAirports;
  