import { Link } from 'react-router-dom';
import AlaskaHensel from '../../assets/images/AlaskaHensel4.jpg'
import HeadShot from '../../assets/images/HeadShot3.JPG'
import AnimatedLetters from '../AnimatedLetters/animatedLetters'
import './index.scss'
import { useEffect, useState } from 'react';
import TextCarousel from './TextCarousel/textCarousel';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')

    const nameArray = ['M','y',' ','n','a','m','e',"'",'s',' ','W', 'i', 'l', 'l','.']
    const jobArray = ['I',"'",'m',' ','a',' ','S','o','f','t','w','a','r','e',' ','E','n','g','i','n','e','e','r','.']

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="container home-page">
            <div className="text-zone">
                <h1>
                <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={4}/>
                <img src={HeadShot} alt="William headshot"/>
                <br/>
                <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={19}/>
                </h1>
                <h2>Developer / Programmer</h2>
                <Link to="/contact" className='flat-button'>CONTACT ME</Link>
            </div>
            <div className='right-side'>
                <img src={AlaskaHensel} alt='William with alaska in the background' />
                <TextCarousel></TextCarousel>
            </div>
        </div>
    )
}

export default Home