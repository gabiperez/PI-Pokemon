import React from "react";
import img404 from '../../img/404.png'
import styles from './Error404.module.css'


const Error404 = () => {
    return (
        <div>
            <div className={styles.h1}>ERROR 404</div>
            <div className={styles.h2}>Page Not found</div>
            <img className={styles.img} src={img404} alt="img not found" />
        </div>
    );
}

export default Error404;