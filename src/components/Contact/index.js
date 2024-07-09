import Loader from 'react-loaders'
import './index.scss'
import AnimatedLetters from '../AnimatedLetters/animatedLetters'
import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

const Contact = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const refForm = useRef()
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs
            .sendForm(
                'service_medhpom',
                'template_uxi6l1o',
                refForm.current,
                'FR_7z3pjcnJFOy_7A'
            )
            .then(
                () => {
                    alert('Message successfully sent!')
                    window.location.reload(false)
                },
                () => {
                    alert('The message failed to send.')
                }
            )
    }

    return (
        <>
        <div className='container contact-page'>
            <div className='text-zone'>
                <h1>
                    <AnimatedLetters
                    letterClass={letterClass}
                    strArray={['C','o','n','t','a','c','t',' ','m','e']}
                    idx={15} />
                </h1>
                <p>
                I would love to hear from you! Whether you have a question, an opportunity, or just want to say hello, please feel 
                free to send me a message using the form below. I'll get back to you as soon as possible.
                </p>
                <div className='contact-form'>
                    <form ref={refForm} onSubmit={sendEmail}>
                        <ul>
                            <li className='half'>
                                <input type='text' name='name' placeholder='Name' required></input>
                            </li>
                            <li className='half'>
                                <input type='email' name='email' placeholder='Email' required></input>
                            </li>
                            <li>
                                <input placeholder="Subject" type="text" name="subject" required></input>
                            </li>
                            <li>
                                <textarea placeholder='Message' name='message' required></textarea>
                            </li>
                            <li>
                                <input type='submit' className='flat-button' value="SEND"></input>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
            <div className='info-map'>
            William Hensel,
            <br/>
            Andover,
            <br/>
            Minnesota
            <br/>
            <span>williamhensel78@gmail.com</span>
            </div>
            <div className='map-wrap'>
                <MapContainer center={[45.2333, -93.2913]} zoom={12}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[45.2333, -93.2913]}>
                    </Marker>
                </MapContainer>
            </div>
            </div>
        <Loader type='ball-clip-rotate-multiple' />
        </>
    )
}

export default Contact