import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
import './CollabMapComponent.scss';

import { Detail } from '../../reducers/ProjectReducer';

interface Position {
  lat: number;
  lng: number;
}

interface CollabMapComponentProps {
  floorplan: Detail;
}

interface CollabMapComponentState {}

export default class CollabMapComponent extends Component<CollabMapComponentProps, CollabMapComponentState> {
  state = {};

  render() {
    const workzone: HTMLElement = document.querySelector('.collab__workzone') || document.body;

    return (
      <Map
        center={[50, 10]}
        zoom={6}
        maxZoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        className="collab__map"
        style={{ width: workzone.offsetWidth, height: workzone.offsetHeight }}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={[50, 10]}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
      </Map>
    );
  }
}
