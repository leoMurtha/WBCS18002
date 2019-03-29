import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppNavbarBrand, } from '@coreui/react';
import logo from '../../assets/img/brand/plane.jpg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children,} = this.props;

    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 60, height: 40, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 40, alt: 'CoreUI Logo' }}
        />
        
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
