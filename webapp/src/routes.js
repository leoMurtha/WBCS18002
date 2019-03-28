import React from 'react';

const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const FindAirports = React.lazy(() => import('./views/Airports/FindAirports'));
const Routes = React.lazy(() => import('./views/Routes/Routes'));
const AirportRoute = React.lazy(() => import('./views/Routes/AirportRoute'));
const SelectDate = React.lazy(() => import('./views/Calendar/SelectDate'));
const Carriers= React.lazy(() => import('./views/Carriers/Carriers'));
const AirportInfo =  React.lazy(() => import('./views/Airports/AirportInfo'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/airports/:id', exact: true, name: 'AirportInfo', component: AirportInfo },
  { path: '/airports/:id/routes', exact: true, name: 'Routes', component: Routes },
  { path: '/airports/:id/routes/:destination', exact: true, name: 'AirportRoute', component: AirportRoute },
  { path: '/carriers', exact: true, name: 'Carriers', component: Carriers  },
  { path: '/airports', exact: true, name: 'FindAirports', component: FindAirports   },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/date',exact: true, name: 'SelectDate', component: SelectDate },

];

export default routes;
