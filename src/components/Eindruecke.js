import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Col, Row, Image } from "react-bootstrap";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Pagination from "@material-ui/lab/Pagination";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Base64Downloader from "react-base64-downloader";

const useStyles = makeStyles({
  root: {
    marginTop: "20px",
    minHeight: "110px",
  },
  media: {
    height: 120,
  },
  expand: {
    transform: "rotate(0deg)",
    float: "right",
  },
  input: {
    display: "none",
  },
});

let url =
  "http://haarbibospring-env.eba-kxmryasd.eu-central-1.elasticbeanstalk.com/haarbibo";

export default function Eindruecke() {
  const classes = useStyles();
  const [alleBilder, setAlleBilder] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [bild, setBild] = React.useState(null);
  const [uploadImage, setUploadImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [seite, setSeite] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [pagination, setPagination] = React.useState(5);
  const [anzahl, setAnzahl] = React.useState(0);
  const [zoom, setZoom] = React.useState(1);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [scaleImg, setScaleImg] = React.useState(null);
  const [doc, setDoc] = React.useState(null);
  const [fileTy, setFileTy] = React.useState("");

  const handleLimit = (event) => {
    setLimit(event.target.value);
  };

  const onCropChange = (crop) => {
    this.setState({ crop });
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const readImage = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.readAsDataURL(file);
    });

  const readImageBinary = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.readAsBinaryString(file);
    });

  const handleChange = async (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];

    let fileType = file.type;
    let backImg;
    if (
      fileType === "image/jpeg" ||
      fileType === "image/png" ||
      fileType === "image/jpg"
    ) {
      backImg = await resizeFile(file);
      setScaleImg(backImg);
    } else {
      setDoc(file);
    }

    readImage(event.target.files[0]).then((dataUri) => {
      setBild(dataUri);
      setUploadImage(dataUri);
      setFileTy(fileType);
    });
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const HandlePageChange = (e, page) => {
    setSeite(page);
  };

  React.useEffect(() => {
    bilderLaden();
    anzahlRows();
  }, []);

  React.useEffect(() => {
    bilderLaden();
  }, [seite, limit]);

  async function bilderLaden() {
    setLoading(true);
    let data = new FormData();
    data.append("page", seite);
    data.append("limit", limit);
    await axios.post(url + "/ladeBilder", data).then((res) => {
      const daten = res.data;

      setAlleBilder(daten);
      setLoading(false);
    });
  }

  const Seite = (text) => {
    const aktuelleSeite = seite;
    if (text === "zurück") {
      if (aktuelleSeite === "1") {
        return;
      } else {
        setSeite(seite - 1);
      }
    } else {
      setSeite(seite + 1);
    }
  };

  async function anzahlRows() {
    await axios.get(url + "/AnzahlRows").then((res) => {
      const daten = res.data;
      setAnzahl(Number(daten.Anzahl));

      let much = (Number(daten.Anzahl) / 5).toFixed();
      setPagination(much);
    });
  }

  async function downloadFile(id) {
    let data = new FormData();
    data.append("id", id);

    const FileDownload = require("js-file-download");

    axios({
      url: url + "/downloadFile",
      method: "POST",
      data: data,
      responseType: "blob", // Important
    }).then((response) => {
      if (response.data.type === "application/pdf") {
        FileDownload(response.data, "test.pdf");
      } else if (response.data.type === "application/csv") {
        FileDownload(response.data, "test.csv");
      } else if (response.data.type === "image/jpeg") {
        FileDownload(response.data, "test.jpeg");
      } else if (response.data.type === "text/plain") {
        FileDownload(response.data, "test.txt");
      }
    });
  }

  async function loescheBild(id) {
    let data = new FormData();
    data.append("_id", id);

    await axios.post(url + "/LoescheBild", data).then((res) => {
      anzahlRows();
      bilderLaden();
    });
  }

  async function bildHochladen() {
    let data = new FormData();
    data.append("Typ", fileTy);
    if (scaleImg !== null) {
      data.append("bild", scaleImg);
    } else {
      data.append("bild", doc);
    }

    await axios.post(url + "/insertBilder", data).then((res) => {
      const message = res.data;

      bilderLaden();
      setBild(null);
      anzahlRows();
      setScaleImg(null);
    });
  }

  return (
    <>
      <Col md={12}></Col>
      <Col md={12} xs={12}>
        <div style={{ marginTop: "20px" }}>
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              {bild !== null ? "Bild ändern" : "Neues Bild"}
            </Button>
          </label>
          <input
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <p></p>
        CROPPER
        <p></p>
        {bild && (
          <>
            <Cropper
              image={bild}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
              classes={{ container: "slider" }}
            />
            <Button
              variant="contained"
              style={{ backgroundColor: "#FEEDD5" }}
              onClick={() => bildHochladen()}
            >
              anwenden
            </Button>
            <hr></hr>
          </>
        )}
      </Col>

      {loading ? (
        <Col md={12} xs={12}>
          <CircularProgress />
        </Col>
      ) : (
        alleBilder.map((bild, index) => {
          return (
            <Col md={3} xs={6} key={`${bild}${index}`}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    title={bild.name}
                    image={bild.bild}
                  />
                </CardActionArea>
                <CardActions style={{ float: "right" }}>
                  <IconButton aria-label="add to favorites">
                    <DeleteIcon onClick={() => loescheBild(bild.id)} />
                  </IconButton>
                  <Button onClick={() => downloadFile(bild.id)}>
                    Download
                  </Button>
                </CardActions>
              </Card>
            </Col>
          );
        })
      )}

      <Col md={12} xs={12} style={{ textAlign: "center" }}>
        <hr></hr>
        <Pagination
          page={seite}
          count={pagination}
          color="primary"
          showFirstButton={true}
          showLastButton={true}
          onChange={(e, page) => HandlePageChange(e, page)}
        />
      </Col>
    </>
  );
}
