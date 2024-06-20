import { Link } from 'react-router-dom';
import HeadShot from '../../assets/images/HeadShot.JPG'
import './index.scss'

const Home = () => {
    return (
        <div className="container home-page">
            <div className="text-zone">
                <h1>Hi, <br/> My Name's Will
                <img src={HeadShot} alt="William"/>
                <br/>
                Software Engineer
                </h1>
                <h2>Developer / Programmer</h2>
                <Link to="/contact" className='flat-button'>CONTACT ME</Link>
            </div>

        </div>
    );
}

export default Home