import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 48.682744192626586,
      lng: 9.002424864484908,
    },
    zoom: 15,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div
        style={{
          height: "20vh",
          width: "50%",
          marginRight: "50%",
          marginLeft: "25%",
          marginBottom: "100px",
          zIndex: -1,
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyC12ybUoeGF6ejO327NvP7MFVMciR5kM3g" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={48.682744192626586}
            lng={9.002424864484908}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
