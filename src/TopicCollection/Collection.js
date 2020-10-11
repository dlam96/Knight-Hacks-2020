import React from 'react';
import './Collection.css';
import CardInfo from '../CardInfo/CardInfo';
import { listOfTopics, listOfTests } from './Cards';
import Grid from '@material-ui/core/Grid';


// jshint ignore : start

export default function Collection(props)
{
    // todo props key = props id = array index
    return (
        <div>
            <div style={{ marginLeft: "5%", marginTop: "2.5%" }}>
                {props.isTopic ? "Topic " + props.id : props.term}
            </div>
            <hr className="underline" />
            <Grid container direction="row" spacing={10} justify="center" alignItems="center">
                {props.isTopic ?
                    listOfTopics.map((elem, idx) => <CardInfo key={idx} id={idx} desc={elem.desc} />) :
                    listOfTests.map((elem, idx) => <CardInfo key={idx} id={idx} desc={elem.desc} />)}
            </Grid>
        </div>
    )
}
