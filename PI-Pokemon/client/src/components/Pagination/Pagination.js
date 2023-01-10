import React from "react";
import styles from './Pagination.module.css'


const Pagination = ({ pokemonsPerPage, allPokemons, pagination, currentPage }) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={styles.list}>
                {
                    pageNumbers?.map(number => (
                        <li className={styles.items} key={number}>
                            <button className={styles.a} onClick={() => pagination(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
            <div className={styles.pagnr}>{`   Actual Page ${currentPage}`}</div>
        </nav>
    );
}
export default Pagination;

