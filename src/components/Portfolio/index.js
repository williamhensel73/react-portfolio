import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters/animatedLetters";
import "./index.scss";
import portfolioData from '../../data/portfolio.json'
//import { getDocs, collection } from 'firebase/firestore';
//import { db } from '../../firebase';

//Manual way works but firebase or a dynamic display would be nice.

const Portfolio = () => { 
    const [letterClass, setLetterClass] = useState('text-animate');
    //const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    });

    useEffect(() => {
       // getPortfolio();
    }, []);
/*
    const getPortfolio = async () => {
        const querySnapshot = await getDocs(collection(db, 'portfolio'));
        setPortfolio(querySnapshot.docs.map((doc) => doc.data()));
    }
*/
    const renderPortfolio = (portfolio) => {
        return (
            <div className="images-container">
                {
                    portfolio.map((port, idx) => {
                        return (
                            <div className="image-box" key={idx}>
                                <img 
                                //should be port.image later and port.title could be port.name or whatever comes from firebase
                                src={port.cover}
                                className="portfolio-image"
                                alt="portfolio" />
                                <div className="content">
                                    <p className="title">{port.title}</p>
                                    <h4 className="description">{port.description}</h4>
                                    <button
                                        className="btn"
                                        onClick={() => window.open(port.url)}
                                    >View</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }


    return (
        <>
            <div className="container portfolio-page">
                <h1 className="page-title">
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={"Portfolio".split("")}
                        idx={15}
                    />
                </h1>
                <div>{renderPortfolio(portfolioData.portfolio)}</div>
            </div>
            <Loader type="ball-clip-rotate-multiple" />
        </>
    );
}

export default Portfolio;