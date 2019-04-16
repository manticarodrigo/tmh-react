import React, { Component, Fragment } from 'react';
import './CollabMapComponent.scss';

import Leaflet, { LatLngBounds } from 'leaflet';
import { ImageOverlay, Map, Marker, Popup } from 'react-leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { Detail } from '../../reducers/ProjectReducer';

interface Position {
  lat: number;
  lng: number;
}

interface CollabMapComponentProps {
  workzoneRef: HTMLDivElement;
  floorplan: Detail;
}

interface CollabMapComponentState {
  mapRef?: Map;
}

export default class CollabMapComponent extends Component<CollabMapComponentProps, CollabMapComponentState> {
  state: CollabMapComponentState = {
    mapRef: undefined,
  };

  handleMapRef = (mapRef: Map) => this.setState({ mapRef });

  calculateBounds = () => {
    const { workzoneRef } = this.props;
    const { mapRef } = this.state;

    if (mapRef) {
      const mapEl = mapRef!.leafletElement;

      // dimensions of the image
      const w = workzoneRef.offsetWidth;
      const h = workzoneRef.offsetHeight;

      // calculate the edges of the image, in coordinate space
      const southWest = mapEl.unproject([0, h], mapEl.getMaxZoom() - 1);
      const northEast = mapEl.unproject([w, 0], mapEl.getMaxZoom() - 1);
      return new LatLngBounds(southWest, northEast);
    }

    return new LatLngBounds([[0, 0], [0, 0]]);
  }

  render() {
    const { workzoneRef, floorplan } = this.props;
    const { mapRef } = this.state;

    return workzoneRef ? (
      <Map
        ref={this.handleMapRef}
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
        style={{ width: workzoneRef.offsetWidth, height: workzoneRef.offsetHeight }}
        bounds={this.calculateBounds()}
      >
        <ImageOverlay
          url={floorplan.image}
          bounds={this.calculateBounds()}
        />
        <Marker position={[50, 10]}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
      </Map>
    ) : <Fragment />;
  }
}
