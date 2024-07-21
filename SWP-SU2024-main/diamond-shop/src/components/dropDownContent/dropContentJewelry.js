import React, { useState } from 'react';
// import '../css/dropContentJewelry.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import engageRing from '../../constant/engagement-rings.png'
import '../../css/jewelryDropdown.css';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';


const DropContentJewelry = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='container' style={{ backgroundColor: '#f5f5f5'}}>
      <div className='dropdown-menu-1' style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ margin: '0' }} className='first-row'>
          <a>
            <h4
              style={{ fontSize: '25px', fontWeight: 'bold', paddingTop: '5px', marginTop: '0', paddingLeft: '25px', marginBottom: '0' }}
            >
              Shape</h4>
          </a>
          <div className='diamond-shape'>
            <div className='diamond-shape-left'>
              <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                Solitaire
              </a><br />
              <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                Halo
              </a><br />
              <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                Bridge Accent
              </a><br />
              <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                Twist
              </a><br />
              <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                ThreeStone
              </a><br />
            </div>

            <div className='diamond-shape-right'>
              <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                Cathedral
              </a><br />
              <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                Trellis
              </a><br />
              <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                Double Halo
              </a><br />
              <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                Royal
              </a><br />
              <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                Five Stone
              </a><br />
            </div>
          </div>
        </div>
        <div style={{ paddingLeft: '30px', paddingRight: '30px', width: '350px' }} className='second-row'>
          <div className='second-row-content'>
            <a>
              <h4
                style={{ fontSize: '25px', fontWeight: 'bold', paddingTop: '5px', marginTop: '0', paddingLeft: '0px', marginBottom: '0' }}
              >
                Type</h4>
            </a>
            <Link to={routes.engagementRings} style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              Engagement Rings
            </Link><br />
            <Link to={routes.weddingRings} style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              Wedding Rings
            </Link><br />
          </div>
        </div>
        <div className='third-row'>
          <div className='third-row-content'>
            <a>
              <h4
                style={{ fontSize: '25px', fontWeight: 'bold', paddingTop: '5px', marginTop: '0', paddingLeft: '5px', marginBottom: '0' }}
              >
                Women's Rings</h4>
            </a>
            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              Diamond
            </a><br />
            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              Eternity
            </a><br />
            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              Platinum
            </a><br />
            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              Rose Gold
            </a><br />
            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              Yellow Gold
            </a><br />
            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              White Gold
            </a><br />
          </div>
        </div>
        <div className='third-row-2'>
          <div className='third-row-content'>
            <a>
              <h4
                style={{ fontSize: '25px', fontWeight: 'bold', paddingTop: '5px', marginTop: '0', paddingLeft: '5px', marginBottom: '0' }}
              >
                Men's Rings</h4>
            </a>
            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              Platinum
            </a><br />
            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              Tungsten
            </a><br />
            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              Titanium
            </a><br />
            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              Rose Gold
            </a><br />
            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              Yellow Gold
            </a><br />
            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
              White Gold
            </a><br />
          </div>
        </div>
        <div className='fourth-row'>
          <img style={{ width: '400px', height: '400px', paddingTop: '30px', paddingLeft: '10px', paddingRight: '50px' }} src={engageRing} /><br />
          <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '2%', fontSize: '20px' }}>
            View All Diamonds
          </a>
        </div>
      </div>
    </div>
  );
};

export default DropContentJewelry;
