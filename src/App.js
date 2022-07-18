import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api/index';

import './App.css';

import Header from './Components/Header/Header';
import List from './Components/List/List';
import MapContainer from './Components/MapContainer/MapContainer';
// import PlaceDetails from '../PlaceDetails/PlaceDetails'

function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked ,setchildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  // const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(''); //created now

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces); 
    
  }, [rating]);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => {
        setPlaces(data);
        setFilteredPlaces([])
        setIsLoading(false);
      })
  }, [type, coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: '100% '}}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading} 
            places = {filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <MapContainer 
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setchildClicked={setchildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
