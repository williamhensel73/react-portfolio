import { Link, NavLink } from 'react-router-dom'
import './index.scss'
import LogoW from '../../assets/images/HeadShot.JPG'
import LogoSubtitle from '../../assets/images/HenselTextWhite.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'


const Sidebar = () => (
    <div className="nav-bar">
        <Link className= "logo" to="/">
            <img src={LogoW} alt="Headshot of Will Hensel" />
            <img className="sub-logo" src={LogoSubtitle} alt="William Hensel in text" />
        </Link>
        <nav>
            <NavLink exact="true" activeclassname="active" to="/">
                <FontAwesomeIcon icon={faHome} color="#FFFFFF"/>
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="about-link" to="/about">
                <FontAwesomeIcon icon={faUser} color="#FFFFFF"/>
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="contact-link" to="/contact">
                <FontAwesomeIcon icon={faEnvelope} color="#FFFFFF"/>
            </NavLink>
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
    </div>
)

export default Sidebar