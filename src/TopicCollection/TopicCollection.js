import React from 'react';
import './TopicCollection.css';
import TopicCard from '../TopicCard/TopicCard';


// jshint ignore : start

export default function TopicCollection()
{

    return (
        <div>
            <div style={{marginLeft: "5%"}}>
                Topic 1
            </div>
            <hr className="underline" />

            <div style={{ textAlign: "center" }} className="cardProps">
                <div className="cardSize" style={{ marginRight: "5%" }}>
                    <TopicCard />
                </div>
                <div className="cardSize" style={{ marginRight: "5%" }}>
                    <TopicCard />
                </div>
                <div className="cardSize" style={{ marginRight: "5%" }}>
                    <TopicCard />
                </div>
                <div className="cardSize">
                    <TopicCard />
                </div>
            </div>
        </div>
    )
}
