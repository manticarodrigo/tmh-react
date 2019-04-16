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
  modelRef?: HTMLImageElement;
  mapRef?: Map;
  width: number;
  height: number;
  bounds: LatLngBounds;
}

export default class CollabMapComponent extends Component<CollabMapComponentProps, CollabMapComponentState> {
  state: CollabMapComponentState = {
    modelRef: undefined,
    mapRef: undefined,
    width: 0,
    height: 0,
    bounds: new LatLngBounds([0, 0], [0, 0]),
  };

  handleModelRef = (modelRef: HTMLImageElement) => this.setState({ modelRef });

  handleMapRef = (mapRef: Map) => this.setState({ mapRef });

  calculateBounds = () => {
    const { modelRef, mapRef } = this.state;
    setTimeout(() => {
      if (modelRef && mapRef) {
        const mapEl = mapRef!.leafletElement;

        // dimensions of the image
        const width = modelRef.offsetWidth;
        const height = modelRef.offsetHeight;

        // calculate the edges of the image, in coordinate space
        const southWest = mapEl.unproject([0, height], 0);
        const northEast = mapEl.unproject([width, 0], 0);
        const bounds = new LatLngBounds(southWest, northEast);

        // mapEl.setMaxBounds(bounds);

        this.setState({ width, height, bounds });
      }
    });
  }

  render() {
    const { floorplan } = this.props;
    const { width, height, bounds } = this.state;

    return (
      <Fragment>
        <img
          ref={this.handleModelRef}
          src={floorplan.image}
          onLoad={this.calculateBounds}
          className="collab__map__model"
        />
        <Map
          ref={this.handleMapRef}
          center={[0, 0]}
          zoom={0}
          maxZoom={0}
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
      </Fragment>
    );
  }
}
