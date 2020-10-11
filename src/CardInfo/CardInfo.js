
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// jshint ignore : start
const useStyles = makeStyles({
    cardSize: {
        display: 'inline-block',
        height: '240px',
        width: '182px',
    },
    alignChild: {
        textAlign: 'center'
    },
    sizedBox: {
        marginTop: '30px'
    }

});


// Boiler plate for a topic or test card, represented by an id and a filler description

export default function CardInfo(props)
{
    const classes = useStyles();

    return (
        <Grid item xs={2}>
            <div>
                <Card variant="outlined" className={classes.cardSize}>
                    <div className={classes.sizedBox}></div>
                    <CardContent>
                        <Typography variant="h5" component="h2" className={classes.alignChild}>
                            id: {props.id}
                        </Typography>
                    </CardContent>
                    <p></p>
                    <CardContent>
                        <Typography variant="h5" component="h2" className={classes.alignChild}>
                            {props.desc}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </Grid>
    )
}

