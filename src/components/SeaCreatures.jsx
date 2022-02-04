import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from "../components/css/display.module.css"

const SeaCreatures = (props) => {

    const [seas, setSeas] = useState([]);
    const [available, setAvailable] = useState([]);

    const history = useHistory();

    const { month, hour, isChanged, setIsChanged } = props

    // console.log("this is the month" + month)
    // console.log("hour " + hour)

    useEffect(() => {
        axios.get(`https://acnhapi.com/v1a/sea`)
            .then(response => {
                console.log(response.data);
                setSeas(response.data)
                const result = seas.filter(sea => sea.availability["month-array-northern"].includes(parseInt(month)) && sea.availability["time-array"].includes(parseInt(hour)))
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
            <h1 className={styles.resultsTitle}>Sea Creatures</h1>
            {seas ?
                available ?
                    available.map((sea, idx) => {
                        return (
                            <img className={styles.resultsImg} key={sea.id} src={`https://acnhapi.com/v1/images/sea/${sea.id}`} onClick={() => history.push(`/sea/${sea.id}`)} />
                        )
                    })
                    :
                    <p>Loading..</p>
                :
                <p>Loading...</p>}
        </div>)
};

export default SeaCreatures;
