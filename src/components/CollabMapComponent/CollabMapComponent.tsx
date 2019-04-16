import React, { Component, Fragment } from 'react';
import './CollabMapComponent.scss';

import { CRS, LatLngBounds } from 'leaflet';
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

    // dimensions of the image
    const width = workzoneRef.offsetWidth - 20;
    const height = workzoneRef.offsetHeight - 20;
    let bounds = new LatLngBounds([[0, 0], [0, 0]]);

    if (mapRef) {
      const mapEl = mapRef!.leafletElement;

      // calculate the edges of the image, in coordinate space
      const southWest = mapEl.unproject([0, height], mapEl.getMaxZoom() - 1);
      const northEast = mapEl.unproject([width, 0], mapEl.getMaxZoom() - 1);
      bounds = new LatLngBounds(southWest, northEast);

      return { width, height, bounds };
    }

    return { width, height, bounds };
  }

  render() {
    const { workzoneRef, floorplan } = this.props;

    const { width, height, bounds } = this.calculateBounds();

    return workzoneRef ? (
      <Map
        ref={this.handleMapRef}
        bounds={bounds}
        center={[0, 0]}
        zoom={1}
        minZoom={-2}
        maxZoom={5}
        attributionControl={false}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        className="collab__map"
        crs={CRS.Simple}
        style={{ width, height }}
      >
        <ImageOverlay
          url={floorplan.image}
          bounds={bounds}
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
