import { useEffect } from 'react';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from '../../../assets/olumsX.png';

const Footer = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='footer'>
            <div className="container">
                <div className="bottom">
                    <div className="left">
                        <img src={logo} alt="OlumsX Logo" style={{ width: '100px', height: 'auto' }} />
                        <span>© {new Date().getFullYear()} LUMS, Lahore</span>
                    </div>
                    <div className="right">
                        <div className="social">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;

