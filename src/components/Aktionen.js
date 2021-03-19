import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Col, Row } from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",

    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <Col md={12} xs={12}>
      <div className={classes.root}>
        <Paper elevation={3} style={{ width: "100%" }}>
          <div style={{ margin: "10px" }}>
            <h3>AKTION</h3>
            <span>sdfdf dsfdsf weef 100€</span>
          </div>
        </Paper>
      </div>
    </Col>
  );
}
