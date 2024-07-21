import React from 'react';
import '../css/footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import logo from '../constant/logo.png';
import { Link } from 'react-router-dom';
import { routes } from '../routes';

const Footer = () => {
    return ( 
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <img src={logo} alt="Luxe Jewel House" className="footer-logo" />
                    <ul className="footer-links">
                        <li><Link to={routes.warrantyPolicy}>Warranty Policy</Link></li>
                        <li><Link to={routes.privacyPolicy}>Privacy Policy</Link></li>
                    </ul>
                    {/* <p>Attractive promotion information:</p>
                    <div className="footer-socials">
                        <a href="#"><FacebookIcon></FacebookIcon></a>
                        <a href="#"><InstagramIcon></InstagramIcon></a>
                        <a href="#"><YouTubeIcon></YouTubeIcon></a>
                    </div> */}
                </div>
                <div className="footer-right">
                    <h4>CONTACT</h4>
                    <p>Hotline: <a href="tel:1-800-123-4567">1-800-123-4567</a></p>
                    <p>Showrooms: FPT University, Lot E2a-7, Street D1, Hi-Tech Park, Long Thanh My, District 9, Ho Chi Minh City</p>
                    <div className="footer-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.479545244647!2d106.79906281418267!3d10.850984360767023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752764a622f669%3A0x43c7d9f929caa72d!2sFPT%20University%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1625560351000!5m2!1sen!2s" 
                            width="300"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; Copyright 2023 - All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
