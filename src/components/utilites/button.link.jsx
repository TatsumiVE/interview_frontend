import React from 'react'
import { Link } from 'react-router-dom'

export const ButtonLink = ({ type, className, route, text,linkText }) => {
    return (
        <>
            <button
                type={type ? type : "button"}
                className={`btn ${className}`}              
            >
                <Link to={route} className={linkText}>{text}</Link>
            </button>
        </>
    )
}
