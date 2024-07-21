import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../education/css/sideBar.css';
import { routes } from '../../routes';

const Sidebar = () => {
    const [isMetalOpen, setIsMetalOpen] = useState(false);
    const [isPearlOpen, setIsPearlOpen] = useState(false);
    const [isDiamondOpen, setIsDiamondOpen] = useState(true);

    const toggleMetal = () => setIsMetalOpen(!isMetalOpen);
    const togglePearl = () => setIsPearlOpen(!isPearlOpen);
    const toggleDiamond = () => setIsDiamondOpen(!isDiamondOpen);

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <div className="section-header" onClick={toggleMetal}>
                        Jewelry Education {isMetalOpen ? '▴' : '▾'}
                    </div>
                    {isMetalOpen && (
                        <div style={{paddingLeft:'15px'}}>
                            <Link style={{textAlign:'left'}} to="/diamond-education/metal-education"><p>Metal Education</p></Link>
                            <Link style={{textAlign:'left'}} to={routes.ringSize}><p>Ring Size</p></Link>
                        </div>
                    )}
                </li>
                <li>
                    <div className="section-header" onClick={toggleDiamond}>
                        Diamond Education {isDiamondOpen ? '▴' : '▾'}
                    </div>
                    {isDiamondOpen && (
                        <div style={{paddingLeft:'15px'}}>
                            <Link style={{textAlign:'left'}} to="/diamond-education/fourCs-education"><p>The 4Cs</p></Link>
                            <Link style={{textAlign:'left'}} to="/diamond-education/cut"><p>Cut</p></Link>
                            <Link style={{textAlign:'left'}} to="/diamond-education/color"><p>Color</p></Link>
                            <Link style={{textAlign:'left'}} to="/diamond-education/clarity"><p>Clarity</p></Link>
                            <Link style={{textAlign:'left'}} to="/diamond-education/carat"><p>Carat</p></Link>
                        </div>
                    )}
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
