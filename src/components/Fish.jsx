import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from "../components/css/display.module.css"

const Fish = (props) => {
    const [fish, setFish] = useState([]);
    const [available, setAvailable] = useState([]);

    const history = useHistory();
    const { month, hour, isChanged, setIsChanged } = props

    // console.log("this is the month" + month)
    // console.log("hour " + hour)

    useEffect(() => {
        axios.get(`https://acnhapi.com/v1a/fish`)
            .then(response => {
                console.log(response.data);
                setFish(response.data)
                const result = fish.filter(fish => fish.availability["month-array-northern"].includes(parseInt(month)) && fish.availability["time-array"].includes(parseInt(hour)))
                // console.log(result)
                setAvailable(result)
                setIsChanged(true)
            })
            .catch(error => {
                console.log(error)
            })
    }, [isChanged]);

    return (
        <div className={styles.resultsDisplay}>
            <h1 className={styles.resultsTitle}>Fish</h1>
            {available ?
                available.map((fish, idx) => {
                    return (
                        <img className={styles.resultsImg} key={fish.id} src={`https://acnhapi.com/v1/images/fish/${fish.id}`} onClick={() => history.push(`/fish/${fish.id}`)} />
                    )
                })
                :
                <p>Loading..</p>}
        </div>)
};

export default Fish;
