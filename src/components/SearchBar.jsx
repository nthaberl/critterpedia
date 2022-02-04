import React, { useState } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import Bugs from "./Bugs";
import Fish from "./Fish";
import SeaCreatures from "./SeaCreatures";
import styles from "../components/css/main.module.css"

const SearchBar = (props) => {

    const [critter, setCritter] = useState("bugs")
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [hour, setHour] = useState(new Date().getHours())
    const [isChanged, setIsChanged] = useState(false);

    const history = useHistory();

    const handleCritter = e => {
        setCritter(e.target.value)
        setIsChanged(!isChanged)
    }

    const handleMonth = e => {
        setMonth(e.target.value)
        setIsChanged(!isChanged)
    }

    const handleHour = e => {
        setHour(e.target.value)
        setIsChanged(!isChanged)
    }


    const handleSubmit = e => {
        e.preventDefault();
        // setIsChanged(!isChanged)
        // history.push(`/${critter}`)
    }

    return (<>
        <div className={styles.background}>
            <div className={styles.header}>
                {/* <img className={styles.mainHeaderImg} src="https://static.wikia.nocookie.net/animalcrossing/images/9/92/NewHorizons.png"/> */}
                <h1 className={styles.mainTitle}>Animal Crossing New Horizons </h1>
                <h1 className={styles.mainTitle}>Critter Finder</h1>
            </div>
            <div className={styles.searchBar}>
                <form onSubmit={handleSubmit}>
                    <p>
                        <b>Search: </b>
                        &nbsp;
                        <select value={critter} onChange={handleCritter}>
                            <option value="bugs">Bugs</option>
                            <option value="sea">Sea Creatures</option>
                            <option value="fish">Fish</option>
                        </select>
                        &nbsp;
                        <select value={month} onChange={handleMonth}>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                        &nbsp;
                        <select value={hour} onChange={handleHour}>
                            <option value="0">12:00 AM</option>
                            <option value="1"> 1:00 AM</option>
                            <option value="2">2:00 AM</option>
                            <option value="3">3:00 AM</option>
                            <option value="4">4:00 AM</option>
                            <option value="5">5:00 AM</option>
                            <option value="6">6:00 AM</option>
                            <option value="7">7:00 AM</option>
                            <option value="8">8:00 AM</option>
                            <option value="9">9:00 AM</option>
                            <option value="10">10:00 AM</option>
                            <option value="11">11:00 AM</option>
                            <option value="12">12:00 PM</option>
                            <option value="13">1:00 PM</option>
                            <option value="14">2:00 PM</option>
                            <option value="15">3:00 PM</option>
                            <option value="16">4:00 PM</option>
                            <option value="17">5:00 PM</option>
                            <option value="18">6:00 PM</option>
                            <option value="19">7:00 PM</option>
                            <option value="20">8:00 PM</option>
                            <option value="21">9:00 PM</option>
                            <option value="22">10:00 PM</option>
                            <option value="23">11:00 PM</option>
                        </select>
                        &nbsp;
                    </p>
                </form>
            </div>


            {critter === "bugs" ? <Bugs month={month} hour={hour} isChanged={isChanged} setIsChanged={setIsChanged} /> : <></>}
            {critter === "sea" ? <SeaCreatures month={month} hour={hour} isChanged={isChanged} setIsChanged={setIsChanged} /> : <></>}
            {critter === "fish" ? <Fish month={month} hour={hour} isChanged={isChanged} setIsChanged={setIsChanged} /> : <></>}
<p className={styles.footer}><img className={styles.footerImg} src="https://www.nicepng.com/png/full/154-1547483_animal-crossing-animal-crossing-leaf-transparent.png"/> created by Natascha & Teressa </p>
        </div>
    </>
    )
}

export default SearchBar;