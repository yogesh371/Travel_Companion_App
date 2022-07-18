import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
// import { GoogleMapReact, LoadScript } from "@react-google-maps/api";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";


import useStyles from "./styles";
// AIzaSyCZQdWZWsNyakL30EbvVherjO4c9HcqFc8

const MapContainer = ({ setCoordinates, setBounds, coordinates, places, setchildClicked }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)')
  const mapStyles = {        
    height: "91.7vh",
    width: "102.4%"
  };
  

  return (
     <LoadScript
       googleMapsApiKey='AIzaSyCZQdWZWsNyakL30EbvVherjO4c9HcqFc8'>
        <div className={classes.mapContainer}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            defaultCenter={coordinates}
            center={coordinates}
            zoom={13}
            margin={[50, 50, 50, 50]}
            options={''}
            onChange={(e) => {
              console.log(e);

              setCoordinates({lat: e.center.lat, lng: e.center.lng });
              setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw});
            }}
            onchildClick={(child) => setchildClicked(child)}
          >
            {places.map((place, i) => (
              <div
                className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}
              >
                {
                  !isDesktop ? (
                    <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                  ) : (
                    <Paper elevation={3} className={classes.paper}>
                      <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                        {place.name}
                      </Typography>
                      <img 
                        className={classes.pointer}
                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                        alt={place.name}
                      />
                      <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                    </Paper>
                  )
                }
              </div>
            ))}
          </GoogleMap>
        </div>
        
     </LoadScript>
  )
}

export default MapContainer;