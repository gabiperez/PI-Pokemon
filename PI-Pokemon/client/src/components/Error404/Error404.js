import React from "react";
import img404 from '../../img/404.png'
import styles from './Error404.module.css'


const Error404 = () => {
    return ( 
        <div>
            <h1 className={styles.h1}>ERROR 404</h1>
            <img className={styles.img} src={img404} alt="img not found" />
            <h2 className={styles.h2}>Page Not found</h2>
        </div>
     );
}
 
export default Error404;