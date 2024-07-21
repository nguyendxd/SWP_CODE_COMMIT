import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import engageRing from '../../constant/engagement-rings.png';

const DropContentER = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle">
                <p>Engagement Rings</p>
                <KeyboardArrowDownIcon style={{ color: 'black' }}></KeyboardArrowDownIcon>
            </button>
            {isOpen && (
                <div style={{ width: '1200px', height: 'auto', display: 'flex', justifyContent: 'space-between' }} className="dropdown-menu">
                    <div style={{ flex: 1 }} className='first-column'>
                        <a>
                            <h4 style={{ fontSize: '25px', paddingTop: '5px', marginTop: '0', paddingLeft: '50px', marginBottom: '0' }}>
                                Build Your Own Ring
                            </h4>
                        </a>
                        <div className='diamond-shape'>
                            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                                Start With A Natural Diamond
                            </a>
                        </div>
                        <div className='diamond-shape'>
                            <a>
                                <h4 style={{ fontSize: '25px', paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0' }}>
                                    Shop Diamonds By Shape
                                </h4>
                            </a>
                            <div className='diamond-shape'>
                                <div className='diamond-shape-left'>
                                    <Link to={routes.diamondList}>
                                        <div className='diamond-item1'>
                                            <img src='../assets/images/Round_Cut_Diamonds.png' />
                                            <p>Round</p>
                                        </div>
                                    </Link>
                                    <Link to={routes.diamondList}>
                                        <div className='diamond-item1'>
                                            <img src='../assets/images/Princess_Cut_Diamonds.png' />
                                            <p>Princess</p>
                                        </div>
                                    </Link>
                                    <Link to={routes.diamondList}>
                                        <div className='diamond-item1'>
                                            <img src='../assets/images/Emerald_Cut_Diamonds.png' />
                                            <p>Emerald</p>
                                        </div>
                                    </Link>
                                    <Link to={routes.diamondList}>
                                        <div className='diamond-item1'>
                                            <img src='../assets/images/Cushion_Shaped_Diamonds.png' />
                                            <p>Cushion</p>
                                        </div>
                                    </Link>
                                    <Link to={routes.diamondList}>
                                        <div className='diamond-item1'>
                                            <img src='../assets/images/Marquise_Cut_Diamonds.png' />
                                            <p>Marquise</p>
                                        </div>
                                    </Link>
                                </div>

                                <div className='diamond-shape-right'>
                                    <Link to={routes.diamondList}>
                                        <div className='diamond-item1'>
                                            <img src='../assets/images/Radiant_Cut_Diamonds.png' />
                                            <p>Radiant</p>
                                        </div>
                                    </Link>
                                    <Link to={routes.diamondList}>
                                        <div className='diamond-item1'>
                                            <img src='../assets/images/Oval_Cut_Diamonds.png' />
                                            <p>Oval</p>
                                        </div>
                                    </Link>
                                    <Link to={routes.diamondList}>
                                        <div className='diamond-item1'>
                                            <img src='../assets/images/Pear_Shaped_Diamonds.png' />
                                            <p>Pear</p>
                                        </div>
                                    </Link>
                                    <Link to={routes.diamondList}>
                                        <div className='diamond-item1'>
                                            <img src='../assets/images/Heart_Shaped_Diamonds.png' />
                                            <p>Heart</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 1, paddingLeft: '30px', paddingRight: '30px' }} className='second-column'>
                        <div className='second-column-content'>
                            <a>
                                <h4 style={{ fontSize: '25px', paddingTop: '5px', marginTop: '0', paddingLeft: '0px', marginBottom: '0' }}>
                                    Shape Of Diamonds
                                </h4>
                            </a>
                            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                                Round
                            </a>
                            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                                Heart
                            </a>
                            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                                Pear
                            </a>
                            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                                Emerald
                            </a>
                            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                                Cushion
                            </a>
                            <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '20px', marginBottom: '0', fontSize: '20px' }}>
                                Oval
                            </a>
                        </div>
                    </div>
                    <div style={{ flex: 1 }} className='third-column'>
                        <img style={{ width: '400px', height: '400px', paddingTop: '30px', paddingLeft: '10px', paddingRight: '50px' }} src={engageRing} />
                        <a style={{ paddingTop: '5px', marginTop: '0', paddingLeft: '10px', marginBottom: '0', fontSize: '20px' }}>
                            View All Diamonds
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropContentER;
