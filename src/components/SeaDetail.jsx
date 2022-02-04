import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from '../components/css/seaview.module.css'

const SeaDetail = (props) => {

    const [sea, setSea] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [name, setName] = useState([]);
    const { id } = useParams();
    const [northernMons, setNorthernMons] = useState([]);
    const [southernMons, setSouthernMons] = useState([]);

    const history = useHistory();

    useEffect(() => {
        axios.get(`http://acnhapi.com/v1/sea/${id}`)
            .then(response => {
                console.log(response.data)
                console.log(response.data.availability)
                console.log(response.data.name)
                console.log(response.data.availability["month-array-northern"])
                console.log(response.data.availability["month-array-southern"])

                const month = [
                    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
                ]

                // declare api northern months in a variable
                let apiNorthernMonth = response.data.availability["month-array-northern"]
                // api: [3, 4, 5, 6, 7, 8, 9]
                // outcome: March, April, May, June, July, August, September
                let northernArr = []
                for (let i = 0; i < apiNorthernMonth.length; i++) {
                    northernArr += (month[parseInt(apiNorthernMonth[i]) - 1] + ", ")
                }
                console.log(northernArr)

                // declare api southern months in a variable
                let apiSouthernMonth = response.data.availability["month-array-southern"]
                // api: [9, 10, 11, 12, 1, 2, 3]
                // outcome: September, October, November, December, January, February, March
                let southernArr = []
                for (let i = 0; i < apiSouthernMonth.length; i++) {
                    southernArr += (month[parseInt(apiSouthernMonth[i]) - 1] + ", ")
                }
                console.log(southernArr)

                setSea(response.data)
                setAvailability(response.data.availability)
                setName(response.data.name["name-USen"].charAt(0).toUpperCase() + response.data.name["name-USen"].slice(1))
                setNorthernMons(northernArr)
                setSouthernMons(southernArr)
            })
            .catch(err => {
                console.log(err);
                setSea("")
                history.push("/")
                //not successful
            })
    }, [id]);

    return (
        <>
            <div className={styles.background}>
                <div className={styles.header}>
                    <h1>Animal Crossing New Horizons </h1>
                    <h1>Critter Finder</h1>
                </div>
                <div className={styles.infoCard}>
                    <div>
                        <h1 className={styles.seaTitle}>{name}</h1>
                        <div className={styles.seaBox}>
                        <img className={styles.seaImage} src={sea.image_uri} alt={sea["file-name"]} width="300" height="300" />
                        </div>
                        <div className={styles.seaButtonGroup}>
                            {
                                sea.id === 1?
                                <></> :
                                <button className={styles.seaButton} onClick={() => history.push(`/sea/${sea.id-1}`)}>Previous</button>
                            }
                            {
                                sea.id === 40?
                                <></> :
                                <button className={styles.seaButton} onClick={() => sea.id === 40 || sea.id === undefined ? history.push(`/sea/${sea.id}`) : history.push(`/sea/${sea.id + 1}`)}>Next</button>
                            }
                        </div>
                    </div>
                    <div className={styles.seaInfo}>
                        <div>
                            <h3 className={styles.seaH3}>Price </h3>
                            <p className={styles.seaP}>{sea.price} bells</p>
                            {/* <p>({sea["price-flick"]} when sold to Flick)</p> */}
                        </div>
                        <div>
                            <h3 className={styles.seaH3}>Speed</h3>
                            <p className={styles.seaP}>{sea.speed}</p>
                        </div>
                        <div>
                            <h3 className={styles.seaH3}>Location </h3>
                            <p className={styles.seaP}>Sea (diving)</p>
                        </div>
                        <div>
                            <h3 className={styles.seaH3}>Appears in these months </h3>
                            <p className={styles.seaP}>{northernMons}</p>
                        </div>
                        {/* <div>
                        <h3>month-southern:</h3>
                        <h5>{southernMons}</h5>
                    </div> */}
                    </div>
                </div>
                <button className={styles.homeButton} onClick={() => history.push("/")}>Back to Critter Finder</button>
            </div>
        </>
    )
}

export default SeaDetail
