import { Link, NavLink } from 'react-router-dom'
import './index.scss'
import LogoW from '../../assets/images/HeadShot.JPG'
import LogoSubtitle from '../../assets/images/HenselTextWhite.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose, faEnvelope, faHome, faSuitcase, faUser } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'


const Sidebar = () => {

    const [showNav, setShowNav] = useState(false);

    return (
    <div className="nav-bar">
        <Link className= "logo" to="/">
            <img src={LogoW} alt="Headshot of Will Hensel" />
            <img className="sub-logo" src={LogoSubtitle} alt="William Hensel in text" />
        </Link>
        <nav className={showNav ? 'mobile-show' : ''}>
            <NavLink onClick={() => setShowNav(false)} exact="true" activeclassname="active" to="/">
                <FontAwesomeIcon icon={faHome} color="#FFFFFF"/>
            </NavLink>
            <NavLink onClick={() => setShowNav(false)} exact="true" activeclassname="active" className="about-link" to="/about">
                <FontAwesomeIcon icon={faUser} color="#FFFFFF"/>
            </NavLink>
            <NavLink onClick={() => setShowNav(false)} exact="true" activeclassname="active" className="portfolio-link" to="/portfolio">
                <FontAwesomeIcon icon={faSuitcase} color="#FFFFFF"/>
            </NavLink>
            <NavLink onClick={() => setShowNav(false)} exact="true" activeclassname="active" className="contact-link" to="/contact">
                <FontAwesomeIcon icon={faEnvelope} color="#FFFFFF"/>
            </NavLink>

            <FontAwesomeIcon onClick={() => setShowNav(false)} icon={faClose} color='#ffd700' size='3x' className='closeIcon'/>

        </nav>
        <ul>
            <li>
                <a target="_blank"
                 rel="nonreferrer"
                href="https://www.linkedin.com/in/william-hensel-940211250/"
                >
                    <FontAwesomeIcon icon={faLinkedin} color="#FFFFFF"/>
                </a>
            </li>
        </ul>
        <FontAwesomeIcon 
        onClick={() => setShowNav(true)}
        icon={faBars} 
        color='#ffd700' 
        size='3x' 
        className='hamburger-icon'/>
    </div>
    )
}
export default Sidebar