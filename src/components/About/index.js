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
        <p>I'm Will, a recent graduate from the University of Wisconsin-Eau Claire
            I graduated with a bachelor of science with a major in software engineering
             and a minor in business management. I'm seeking a tech role, primarily
             in development or software engineering. I hope to grow into a 
             senior role and be someone an engineering team can rely on. 
             I also would like to lead a team of tech professionals eventually.
        </p>
        <p>I possess technical skills such as Java, C, HTML, CSS, JavaScript, SQL, 
             and PHP. Furthermore, I have experience with Git/GitHub, development methodologies, 
             working with a development team, and the software lifecycle. Other skills I am confident 
             with are problem-solving, analytical skills, communication, interpersonal 
             skills, and learning new concepts quickly.
        </p>
        <p>When I'm not working on projects, I love staying active and engaged with hobbies. 
            I enjoy lifting weights, immersing myself in video games, 
             and spending time with my dog Koda. I also volunteer for the Sons 
             of The American Legion, an organization that supports veterans. I believe in 
             teamwork and continuous learning, and I am committed to personal growth and improvement. 
             Lastly, a fun fact about me is that I played rugby in college.
        </p>
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