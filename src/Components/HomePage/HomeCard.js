import React from 'react';
import "./styles.css"
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion";

// this is our reusable component for the pages of our app

export const HomeCard=({heading, image, path, delay}) =>{

    return (
        <motion.div
            className="home-card d-flex"
            style={{ backgroundColor: "#000000" }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: delay }}
        >
            
                <NavLink to={path} className="home-card-heading">
                    <h1>{heading}</h1>
                </NavLink>
                
                <div className="home-img">
                    <img src={image} alt="bg-images" />
                </div>
            
        </motion.div>
    )
} 
  