import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/dropContentDiamond.css';
import banner from '../../constant/education_banner.png';
import { routes } from '../../routes';

const DropContentEducation = () => {
  return (
    <div>
      <div className="education-section" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="columns" style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '1%' }}>
          <div className="column" style={{ marginLeft: '5%', width: '30%' }}>
            <h4 style={{ fontSize: '150%', paddingTop: '5px', marginTop: '0', marginBottom: '0', fontWeight: '600' }}>
              Learn about Diamonds
            </h4>
            <Link to={routes.fourCs} style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '0', marginBottom: '0', fontSize: '20px' }}>
              <p>Learn About The 4Cs</p>
            </Link>
            <Link to={routes.cut} style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '0', marginBottom: '0', fontSize: '20px' }}>
              <p>Cut</p>
            </Link>
            <Link to={routes.color} style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '0', marginBottom: '0', fontSize: '20px' }}>
              <p>Color</p>
            </Link>
            <Link to={routes.clarity} style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '0', marginBottom: '0', fontSize: '20px' }}>
              <p>Clarity</p>
            </Link>
            <Link to={routes.carat} style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '0', marginBottom: '0', fontSize: '20px' }}>
              <p>Carat</p>
            </Link>
          </div>
          <div className="column" style={{ marginLeft: '5%', width: '30%' }}>
            <h4 style={{ fontSize: '150%', paddingTop: '5px', marginTop: '0', marginBottom: '0', fontWeight: '600' }}>
              Learn about Jewelry
            </h4>
            <Link to={routes.metalEdu} style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '0', marginBottom: '0', fontSize: '20px' }}>
              <p>Metal Education</p>
            </Link>
            <Link to={routes.ringSize} style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '0', marginBottom: '0', fontSize: '20px' }}>
              <p>Find Your Ring Size</p>
            </Link>
          </div>
          <div className="image-section" style={{ alignItems: 'center', width: '30%' }}>
            <img style={{ width: '100%', height: 'auto', paddingTop: '30px', paddingRight:'20%' }} src={banner} alt="Diamonds and Rings" />
            <Link to={routes.diamond} className="view-all-education" style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '0', marginBottom: '0', fontSize: '20px' }}>
              <p>View All Education</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropContentEducation;
