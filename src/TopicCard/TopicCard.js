
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// jshint ignore : start

export default function TopicCard()
{
    return (
        <div>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Topic
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Title
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
