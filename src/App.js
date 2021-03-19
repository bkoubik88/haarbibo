import React from "react";

import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Navigation from "./components/Navigation.js";
import Formular from "./components/Formular.js";
import Eindruecke from "./components/Eindruecke.js";
import Aktionen from "./components/Aktionen.js";

import moment from "moment";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import Nachricht from "./components/Nachricht.js";
import { Col, Row } from "react-bootstrap";
import "moment/locale/de";
moment.locale("de");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const [nachricht, setNachricht] = React.useState("");
  const [nachrichtenStatus, setNachrichtenStatus] = React.useState("info");
  const [oeffnen, setOeffnen] = React.useState(false);
  const [seite, setSeite] = React.useState("Termin");

  const welcheSeite = (s) => {
    setSeite(s);
  };

  const nachrichtSchließen = () => {
    setOeffnen(false);
  };

  const fehlerterminBuchung = (text) => {
    setOeffnen(true);
    setNachricht(text);
    setNachrichtenStatus("error");
  };

  const terminBuchung = (daten) => {
    setOeffnen(true);
    setNachricht(
      "Dein Terminwunsch für den " +
        moment(daten.get("termin")).format("LLL") +
        " wird geprüft."
    );
    setNachrichtenStatus("success");
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" style={{ textAlign: "center" }}>
        <Grid item xs={12} style={{ marginTop: "2%" }}>
          <img
            alt="Haarbibo"
            src={`${process.env.PUBLIC_URL}/logo.png`}
            id="logo"
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "1%" }}>
          <h1 id="logoTitel" style={{ letterSpacing: "2px", color: "#4A2E1C" }}>
            HAARBIBO
          </h1>
        </Grid>

        {seite === "Termin" ? (
          <Grid item xs={12} style={{ marginTop: "10%" }}>
            <Formular
              terminBuchung={terminBuchung}
              fehlerterminBuchung={fehlerterminBuchung}
            ></Formular>
          </Grid>
        ) : seite === "Eindrücke" ? (
          <Row style={{ marginTop: "10%" }}>
            <Eindruecke></Eindruecke>
          </Row>
        ) : (
          <Row style={{ marginTop: "10%" }}>
            <Aktionen></Aktionen>
          </Row>
        )}

        <hr></hr>

        <Grid
          container
          spacing={0}
          style={{ textAlign: "center", marginBottom: "70px" }}
        >
          <Grid item xs={12} md={3} style={{ marginTop: "5%" }}>
            <p>
              <span style={{ fontWeight: "bold" }}>Mo - Sa</span>{" "}
            </p>
            <p>
              <span>09:00 bis 20:00 Uhr</span>
            </p>
          </Grid>
          <Grid item xs={12} md={3} style={{ marginTop: "5%" }}>
            <p>
              <span style={{ fontWeight: "bold" }}>styling@haarbibo.de</span>
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>07031 / 922 76 92</span>
            </p>
          </Grid>
          <Grid item xs={12} md={3} style={{ marginTop: "5%" }}>
            <p>
              <span>Impressum</span>
            </p>
            <p>
              <span>Datenschutz</span>
            </p>
          </Grid>
          <Grid item xs={12} md={3} style={{ marginTop: "5%" }}>
            <p>
              <FacebookIcon fontSize="large" /> {" | "}
              <InstagramIcon fontSize="large" />
            </p>
          </Grid>
        </Grid>
      </Container>
      <Nachricht
        oeffnen={oeffnen}
        nachricht={nachricht}
        nachrichtenStatus={nachrichtenStatus}
        nachrichtSchließen={nachrichtSchließen}
      ></Nachricht>

      <Navigation welcheSeite={welcheSeite} aktuellOffen={seite}></Navigation>
    </>
  );
}

export default App;
