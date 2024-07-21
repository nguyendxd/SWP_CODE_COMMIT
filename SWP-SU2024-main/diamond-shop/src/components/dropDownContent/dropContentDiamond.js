import React from 'react';
import '../../css/dropContentDiamond.css';
import { routes } from '../../routes';
import { Link } from 'react-router-dom';
import giaImg from '../../constant/diamond-gia.png';

const DropContentDiamond = () => {
  return (
    <div className='navbarDropdown-container-diamond'>
      <div className="navbarDropdown">
        <div className="navbarDropdown-menu">
          <div className='navbarDropdown-menu-1'>
            <div className='navbarDropdown-first-row'>
              <h4 style={{ fontSize: '150%', paddingTop: '5px', marginTop: '0', marginBottom: '0', fontWeight:'600' }}>
                Shop Diamonds By Shape
              </h4>
              <div className='navbarDropdown-diamond-shape'>
                <div className='navbarDropdown-diamond-shape-left'>
                  <Link to={`${routes.diamond}?shape=Round`}>
                    <div className='navbarDropdown-diamond-item1'>
                      <img src='../assets/images/Round_Cut_Diamonds.png' alt="Round" />
                      <p>Round</p>
                    </div>
                  </Link>
                  <Link to={`${routes.diamond}?shape=Princess`}>
                    <div className='navbarDropdown-diamond-item1'>
                      <img src='../assets/images/Princess_Cut_Diamonds.png' alt="Princess" />
                      <p>Princess</p>
                    </div>
                  </Link>
                  <Link to={`${routes.diamond}?shape=Emerald`}>
                    <div className='navbarDropdown-diamond-item1'>
                      <img src='../assets/images/Emerald_Cut_Diamonds.png' alt="Emerald" />
                      <p>Emerald</p>
                    </div>
                  </Link>
                  <Link to={`${routes.diamond}?shape=Cushion`}>
                    <div className='navbarDropdown-diamond-item1'>
                      <img src='../assets/images/Cushion_Cut_Diamonds.png' alt="Cushion" />
                      <p>Cushion</p>
                    </div>
                  </Link>
                  <Link to={`${routes.diamond}?shape=Marquise`}>
                    <div className='navbarDropdown-diamond-item1'>
                      <img src='../assets/images/Marquise_Cut_Diamonds.png' alt="Marquise" />
                      <p>Marquise</p>
                    </div>
                  </Link>
                </div>
                <div className='navbarDropdown-diamond-shape-right'>
                  <Link to={`${routes.diamond}?shape=Radiant`}>
                    <div className='navbarDropdown-diamond-item1'>
                      <img src='../assets/images/Radiant_Cut_Diamonds.png' alt="Radiant" />
                      <p>Radiant</p>
                    </div>
                  </Link>
                  <Link to={`${routes.diamond}?shape=Oval`}>
                    <div className='navbarDropdown-diamond-item1'>
                      <img src='../assets/images/Oval_Cut_Diamonds.png' alt="Oval" />
                      <p>Oval</p>
                    </div>
                  </Link>
                  <Link to={`${routes.diamond}?shape=Pear`}>
                    <div className='navbarDropdown-diamond-item1'>
                      <img src='../assets/images/Pear_Cut_Diamonds.png' alt="Pear" />
                      <p>Pear</p>
                    </div>
                  </Link>
                  <Link to={`${routes.diamond}?shape=Heart`}>
                    <div className='navbarDropdown-diamond-item1'>
                      <img src='../assets/images/Heart_Cut_Diamonds.png' alt="Heart" />
                      <p>Heart</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className='navbarDropdown-second-row'>
              <div className='navbarDropdown-second-row-content'>
                <h4 style={{ fontSize: '25px', paddingTop: '5px', marginTop: '0', paddingLeft: '0px', marginBottom: '0' }}>
                  Learn About
                </h4>
                <Link to={routes.diamondList} style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '0', marginBottom: '0', fontSize: '20px' }}>
                  How Shape Affects Price
                </Link>
                <Link to={routes.diamondList} style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '0', marginBottom: '0', fontSize: '20px' }}>
                  Learn About the 4Cs
                </Link>
                <Link to={routes.diamondList} style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '0', marginBottom: '0', fontSize: '20px' }}>
                  Ethically Sourced
                </Link>
                <Link to={routes.diamondList} style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '0', marginBottom: '0', fontSize: '20px' }}>
                  Diamond Sustainability
                </Link>
              </div>
            </div>
            <div className='navbarDropdown-third-row'>
              <img style={{ width: '50%', height: '300px', paddingTop: '30px' }} src={giaImg} alt="GIA" />
              <Link to={routes.diamond} style={{ marginBottom: '0', fontSize: '20px' }}>
                View All Diamonds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropContentDiamond;
