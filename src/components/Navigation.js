import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FolderIcon from "@material-ui/icons/Folder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EventIcon from "@material-ui/icons/Event";
import AnnouncementIcon from "@material-ui/icons/Announcement";
const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: "0",
    background: "#4A2E1C",
  },
});

export default function LabelBottomNavigation({ welcheSeite, aktuellOffen }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(aktuellOffen);

  const handleChange = (event, seite) => {
    setValue(seite);
  };

  React.useEffect(() => {
    welcheSeite(value);
  }, [value]);

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Termin"
        value="Termin"
        selected
        icon={<EventIcon />}
      />
      <BottomNavigationAction
        label="Eindrücke"
        value="Eindrücke"
        icon={<FavoriteIcon />}
      />

      <BottomNavigationAction
        label="Aktionen"
        value="Aktionen"
        icon={<AnnouncementIcon />}
      />
    </BottomNavigation>
  );
}
