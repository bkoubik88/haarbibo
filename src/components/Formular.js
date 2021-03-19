import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Formular({ terminBuchung, fehlerterminBuchung }) {
  const classes = useStyles();

  const [vorname, setVorname] = React.useState("");
  const [nachname, setNachname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [termin, setTermin] = React.useState(new Date());

  React.useEffect(() => {
    const dateNow = new Date(); // Creating a new date object with the current date and time
    const year = dateNow.getFullYear(); // Getting current year from the created Date object
    const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
    const month = // Setting current Month number from current Date object
      monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
        ? `0${monthWithOffset}`
        : monthWithOffset;
    const date =
      dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
        ? `0${dateNow.getUTCDate()}`
        : dateNow.getUTCDate();

    const materialDateInput = `${date}.${month}.${year} `; // combining to format for defaultValue or value attribute of material <TextField>
    let stunde = dateNow.getHours();
    let minute = dateNow.getMinutes();

    if (stunde < 10) {
      stunde = "0" + stunde;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }

    const buildIt = `${year}-${month}-${date}T${stunde}:${minute}`;
    setTermin(buildIt);
  });

  const terminAnfrage = () => {
    if (nachname !== "" && email !== "" && termin !== "") {
      let data = new FormData();
      data.append("nachname", nachname);
      data.append("vorname", vorname);
      data.append("email", email);
      data.append("termin", termin);
      terminBuchung(data);
    } else {
      fehlerterminBuchung(
        "Bitte fülle alle mit Stern(*) gekennzeichneten Felder aus"
      );
      return;
    }
  };

  function handleChange(ev) {
    if (!ev.target["validity"].valid) return;
    const dt = ev.target["value"] + ":00Z";
    setTermin(dt);
  }

  return (
    <>
      <h3>
        <span style={{ fontWeight: "bold" }}>
          Termin<span>anfrage</span>
        </span>
      </h3>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="vorname"
          label="Vorname"
          variant="outlined"
          value={vorname}
          onChange={(e) => setVorname(e.target.value)}
        />
        <p></p>
        <TextField
          id="nachname"
          label="Nachname"
          variant="outlined"
          required
          value={nachname}
          onChange={(e) => setNachname(e.target.value)}
        />
        <p></p>
        <TextField
          id="email"
          label="EMail"
          variant="outlined"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p></p>
        <TextField
          id="termin"
          label="Terminwunsch"
          type="datetime-local"
          value={(termin || "").toString().substring(0, 16)}
          defaultValue={termin}
          className={classes.textField}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <p></p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => terminAnfrage()}
        >
          anfragen
        </Button>
      </form>
    </>
  );
}
