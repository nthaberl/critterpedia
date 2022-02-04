import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from "../components/css/fishview.module.css"

const FishDetail = (props) => {
    // 
    const [fish, setFish] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [name, setName] = useState([]);
    const { id } = useParams();
    const [northernMons, setNorthernMons] = useState([]);
    const [southernMons, setSouthernMons] = useState([]);

    const history = useHistory();

    useEffect(() => {
        axios.get(`http://acnhapi.com/v1/fish/${id}`)
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
                // console.log(northernArr)

                // declare api southern months in a variable
                let apiSouthernMonth = response.data.availability["month-array-southern"]
                // api: [9, 10, 11, 12, 1, 2, 3]
                // outcome: September, October, November, December, January, February, March
                let southernArr = []
                for (let i = 0; i < apiSouthernMonth.length; i++) {
                    southernArr += (month[parseInt(apiSouthernMonth[i]) - 1] + ", ")
                }
                // console.log(southernArr)



                setFish(response.data)
                setAvailability(response.data.availability)
                setName(response.data.name["name-USen"].charAt(0).toUpperCase() + response.data.name["name-USen"].slice(1))
                setNorthernMons(northernArr)
                setSouthernMons(southernArr)
            })
            .catch(err => {
                console.log(err);
                setFish("")
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
                        <h1 className={styles.fishTitle}>{name}</h1>
                        <div className={styles.fishBox}>
                        <img className={styles.fishImage} src={fish.image_uri} alt={fish["file-name"]}/>
                        </div>
                        <div className={styles.fishButtonGroup}>
                            {fish.id === 1? 
                            <></> :
                            <button className={styles.fishButton} onClick={() => history.push(`/fish/${fish.id - 1}`)}>Previous</button>
                            }
                            {fish.id === 80? 
                            <></> :
                            <button className={styles.fishButton} onClick={() => fish.id === 80 || fish.id === undefined ? history.push(`/fish/${fish.id}`) : history.push(`/fish/${fish.id + 1}`)}>Next</button>
                            }
                        </div>
                    </div>
                    <div className={styles.fishInfo}>
                        <div>
                            <h3>Price </h3>
                            <p className={styles.fishP}>{fish.price} bells</p>
                            {/* <p>({fish["price-flick"]} when sold to Flick)</p> */}

                            <div >
                                <h3 className={styles.fishH3}>Rarity</h3>
                                <p className={styles.fishP}>{availability.rarity}</p>
                            </div>
                            <div>
                                <h3 className={styles.fishH3}>Location:</h3>
                                <p className={styles.fishP}>{availability.location}</p>
                            </div>
                            <div>
                                <h3 className={styles.fishH3}>Appears in these months </h3>
                                <p className={styles.fishP}>{northernMons}</p>
                            </div>
                            {/* <div>
                                <h3>month-southern:</h3>
                                <h5>{southernMons}</h5>
                            </div> */}
                        </div>
                    </div>
                </div>
                <button className={styles.homeButton} onClick={() => history.push("/")}>Back to Critter Finder</button>
            </div>
        </>
    )
};

export default FishDetail;
