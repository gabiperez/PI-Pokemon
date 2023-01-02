import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAlltypes } from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import styles from './Filters.module.css'

const Filters = () => {

  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getAlltypes())
  }, [dispatch]);


  return (
    <div className={styles.div}>
      <div>
        <SearchBar />
      </div>
      <div >
        <h4 className={styles.h4}>Filters</h4>
        <label className={styles.label}>Created - Api</label>
        <select className={styles.select} >
          <option value="all">ALL</option>
          <option value="api">API</option>
          <option value="created">CREATED</option>
        </select>


        <label className={styles.label}>Types</label>
        <select className={styles.select} >
          <option value='all'>ALL</option>
          {
            allTypes?.map(e => {
              return (
                <option key={e.id} value={e.name}>{e.name.toUpperCase()}</option>
              )
            })
          }
        </select>
      </div>

      <div>
        <h4 className={styles.h4}>Order</h4>
        <select className={styles.select}>
          <option>-</option>
          <option className={styles.order}>Strength</option>
          <option value="asc" >ASC</option>
          <option value="desc" >DESC</option>
          <option className={styles.order}>Alphabetically</option>
          <option value="asc" >A - Z</option>
          <option value="desc" >Z - A</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;