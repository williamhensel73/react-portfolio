import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters/animatedLetters'
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCss3, faGitAlt, faHtml5, faJava, faJsSquare, faReact } from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'

const About = () => {

    const [letterClass, setLetterClass] = useState('text-animate')
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return(
        <>
<div className='container about-page'>
    <div className='text-zone'>
        <h1>
            <AnimatedLetters
            letterClass={letterClass}
             strArray={['A','b','o','u','t',' ','m','e']}
             idx={15}
             />
        </h1>
        <p>Test text</p>
        <p>test2</p>
        <p>test3</p>
    </div>

    <div className='stage-cube-cont'>
        <div className='cubeSpinner'>
            <div className='face1'>
                <FontAwesomeIcon icon={faHtml5} color='#F06529' />
            </div>
            <div className='face2'>
                <FontAwesomeIcon icon={faCss3} color='#28A4D0' />
            </div>
            <div className='face3'>
                <FontAwesomeIcon icon={faReact} color='#5ED4F4' />
            </div>
            <div className='face4'>
                <FontAwesomeIcon icon={faJsSquare} color='#EFD81D' />
            </div>
            <div className='face5'>
                <FontAwesomeIcon icon={faGitAlt} color='#EC4D28' />
            </div>
            <div className='face6'>
                <FontAwesomeIcon icon={faJava} color='#5382a1' />
            </div>
        </div>
    </div>

</div>
        <Loader type="ball-clip-rotate-multiple"/>
</>
    )
}

export default About