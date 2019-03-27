import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

import PinIcon from './PinIcon';
import Report from './Report';
import Context from '../context';

const INITIAL_VIEWPORT = {
  latitude: 34.0522,
  longitude: -118.2437,
  zoom: 13
}

const Map = ({ classes }) => {
  const { state, dispatch } = useContext(Context);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null)
  useEffect(() => {
    getUserPosition()
  }, [])

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        setViewport({ ...viewport, latitude, longitude })
        setUserPosition({ latitude, longitude })
      })
    }
  }

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return
    if (!state.draft) {
      dispatch({ type: "CREATE_DRAFT" })
    }
    const [longitude, latitude] = lngLat
    dispatch({
      type: "UPDATE_DRAFT_LOCATION",
      payload: { longitude, latitude }
    })
  }

  return (
    <div className={classes.root}>
      <ReactMapGL
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiYnJpYW53dGF5bG9yIiwiYSI6ImNqdHFlbzhhZzBlbjA0NG9jNHh5MjltZGMifQ.i8-mAsuJhhcZp7pC_LCKCA"
        onViewportChange={newViewport => setViewport(newViewport)}
        onClick={handleMapClick}
        {...viewport}
      >
      {/* Navigation Control */}
        <div className={classes.navigationControl}>
          <NavigationControl
            onViewportChange={newViewport => setViewport(newViewport)}
          />   
        </div>

        {/* Pin for User's Current Position */}
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="red" />
          </Marker>
        )}

        {/* Darft Pin */}
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="red" />
          </Marker>
        )}
      </ReactMapGL>

      {/* Blog Area to add Pin Content */}
      <Report />
    </div>
  )
};

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
