import React from 'react';

const Airports = React.lazy(() => import('./views/Airports/Airports'));
const Route = React.lazy(() => import('./views/Routes/Route'));
const SelectDate = React.lazy(() => import('./views/Calendar/SelectDate'));
const AirportInfo = React.lazy(() => import('./views/Airports/AirportInfo'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/airports/:id', exact: true, name: 'AirportInfo', component: AirportInfo },
  { path: '/airports/:id/routes/:destination', exact: true, name: 'Route', component: Route },
  { path: '/airports/:id/routes/:destination/carrier/:carrier', exact: true, name: 'SelectDate', component: SelectDate },
  { path: '/airports', exact: true, name: 'Airports', component: Airports },
];

export default routes;
