import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanPokemons, getPokemons } from '../../actions';
import Card from '../Card/Card';
import Filters from '../Filters/Filters';
import Pagination from '../Pagination/Pagination';
import Nav from '../Nav/Nav';
import Loading from '../Loading/Loading';
import styles from './Home.module.css'

export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)
    //Paginado 
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    // console.log(allPokemons);
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const pagination = pageNumber => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])


    return (
        <div>
            {allPokemons.length > 0 ?
                <div>
                    <Nav />
                    <div className={styles.home}>
                        <div className={styles.filters}>
                            <Filters />
                        </div>
                        <div>
                            <div className={styles.cards}>
                                {
                                    currentPokemons?.map((e, k) => {
                                        return (
                                            <div key={k} className={styles.card}>
                                                <Card
                                                    key={e.id}
                                                    id={e.id}
                                                    name={e.name}
                                                    image={e.img}
                                                    types={e.types} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <Pagination
                                    pokemonsPerPage={pokemonsPerPage}
                                    allPokemons={allPokemons.length}
                                    pagination={pagination}
                                />
                            </div>
                        </div>
                    </div>
                </div> :
                <Loading />
            }
        </div>
    )
};
