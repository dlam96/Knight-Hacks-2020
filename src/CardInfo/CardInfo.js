
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// jshint ignore : start

export default function CardInfo(props)
{
    return (
        <Grid item xs={2}>
            <div>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            id: {props.id}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {props.desc}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </Grid>
    )
}

