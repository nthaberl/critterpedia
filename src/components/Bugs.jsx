import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from "../components/css/display.module.css"

const Bugs = (props) => {

    const [bugs, setBugs] = useState([]);
    const [available, setAvailable] = useState([]);
    // const [isChanged, setIsChanged] = useState(false);

    const { month, hour, isChanged, setIsChanged } = props

    const history = useHistory();

    // console.log("this is the month" + month)
    // console.log("hour " + hour)

    useEffect(() => {
        axios.get(`https://acnhapi.com/v1a/bugs/`)
            .then(response => {
                // console.log(response.data);
                // console.log("this is the month array" + response.data[0].availability["month-array-northern"])
                // console.log("this is the time array" + response.data[0].availability["time-array"])
                setBugs(response.data)
                const result = bugs.filter(bug => bug.availability["month-array-northern"].includes(parseInt(month)) && bug.availability["time-array"].includes(parseInt(hour)))
                // console.log(result)
                setAvailable(result)
                setIsChanged(true)
                // console.log(available)
            })
            .catch(error => {
                console.log(error)
            })
    }, [isChanged])





    return (
        <div className={styles.resultsDisplay}>
            <h1 className={styles.resultsTitle}>Bugs</h1>
            {
                available ?
                    available.map((bug, idx) => {
                        return (
                            <>
                                <img key={idx} className={styles.resultsImg} src={`https://acnhapi.com/v1/images/bugs/${bug.id}`} onClick={() => history.push(`/bugs/${bug.id}`)}/>
                            </>
                        )
                    })
                    :
                    <p>Loading..</p>}


        </div>)
};

export default Bugs
