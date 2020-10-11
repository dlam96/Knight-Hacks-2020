import React from "react";
import Cards from "../Cards/Cards.js";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import LinkedList from "./linkedList.png";
import BST from "./bst.png";
import Summation from "./summation.gif";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  cards: {
    padding: theme.spacing(5, 1, 0, 3),
  },
  topic: {
    color: "#FF8F40",
    padding: theme.spacing(3, 0, 1, 0),
    borderBottom: "2px solid grey",
    width: "75%",
    marginLeft: theme.spacing(23),
  },
}));
// mock data
const data = [
  {
    id: 1,
    title: "Linked List",
    img: LinkedList,
    path: "/CodeEditor",
  },
  {
    id: 2,
    title: "Sorting Algorithms",
    img: Summation,
    path: "/CodeEditor",
  },
  {
    id: 3,
    title: "Binary Search Trees",
    img: BST,
    path: "/CodeEditor",
  },
];
export default function CardMenu() {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      className={classes.container}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom className={classes.topic}>
            Topic 1
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justify="center">
            {data.map((data, index) => (
              <Grid
                item
                key={data.id}
                xs={3}
                className={classes.cards}
                onClick={() => handleClick(data.path)}
              >
                <Cards title={data.title} img={data.img} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
