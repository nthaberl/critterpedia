import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from "../components/css/bugview.module.css"

const BugDetail = (props) => {
    const [bugs, setBugs] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [name, setName] = useState([]);
    const { id } = useParams();
    const [northernMons, setNorthernMons] = useState([]);
    const [southernMons, setSouthernMons] = useState([]);

    const history = useHistory();


    // axios uses response.data, fetch uses results
    useEffect(() => {
        axios.get(`http://acnhapi.com/v1a/bugs/${id}`)
            .then(response => {
                console.log(response.data)
                console.log(response.data.availability)
                console.log(response.data.name)
                console.log(response.data.availability["month-array-northern"])
                console.log(response.data.availability["month-array-southern"])
                // declare months to change month arrays from numbers to month name
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
                    // northernArr.concat(month[parseInt(apiNorthernMonth[i]) - 1])
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

                // set api request data
                setBugs(response.data)
                setAvailability(response.data.availability)
                setName(response.data.name["name-USen"].charAt(0).toUpperCase() + response.data.name["name-USen"].slice(1))
                setNorthernMons(northernArr)
                setSouthernMons(southernArr)

            })
            .catch(err => {
                console.log(err);
                setBugs("");
                history.push("/")
                //not successful
            })
    }, [id]);
    // {bugID}


    return (
        <>
            <div className={styles.background}>
                <div className={styles.header}>
                    <h1>Animal Crossing New Horizons </h1>
                    <h1>Critter Finder</h1>
                </div>
                <div className={styles.infoCard}>
                    {/* {JSON.stringify(bugs)} */}
                    <div>
                        <h1 className={styles.bugTitle}>{name}</h1>
                        <div className={styles.bugBox}>
                            <img className={styles.bugImage} src={bugs.image_uri} alt={bugs["file-name"]} />
                        </div>
                        <div className={styles.bugButton}>
                            {
                            bugs.id === 1? 
                            <></> :
                            <button onClick={() => history.push(`/bugs/${bugs.id - 1}`)}>Previous</button>
                            }
                            {
                                bugs.id === 80 ?
                                <></> :
                                <button onClick={() => bugs.id === 80 || bugs.id === undefined ? history.push(`/bugs/${bugs.id}`) : history.push(`/bugs/${bugs.id + 1}`)}>Next</button>
                            }
                        </div>
                    </div>
                    <div className={styles.bugInfo}>
                        <div>
                            <h3 className={styles.bugH3}>Price {bugs.price} bells </h3>
                            <p className={styles.bugP}>({bugs["price-flick"]} when sold to Flick)</p>
                        </div>
                        {/* {JSON.stringify(bugs.availability)} */}
                        <div >
                            <h3 className={styles.bugH3}>Rarity </h3>
                            <p className={styles.bugP}>{availability.rarity}</p>
                        </div>
                        <div>
                            <h3 className={styles.bugH3}>Location </h3>
                            <p className={styles.bugP}>{availability.location}</p>
                        </div>
                        <div>
                            <h3 className={styles.bugH3}>Appears in these months </h3>
                            <p className={styles.bugP}>{northernMons}</p>
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
export default BugDetail;