import React, { Component, Fragment } from 'react';
import './CollabMapComponent.scss';

import { CRS, LatLngBounds, LeafletEvent, LeafletMouseEvent, LatLng } from 'leaflet';
import { ImageOverlay, Map, Marker, Popup } from 'react-leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { Detail } from '../../reducers/ProjectReducer';

interface CollabMapComponentProps {
  workzoneRef: HTMLDivElement;
  floorplan: Detail;
}

interface CollabMapComponentState {
  mapRef?: Map;
  width?: number;
  height?: number;
  bounds?: LatLngBounds;
}

export default class CollabMapComponent extends Component<CollabMapComponentProps, CollabMapComponentState> {
  state: CollabMapComponentState = {};

  componentDidMount = () => {
    const { floorplan } = this.props;
    if (floorplan) {
      const img = new Image();
      img.src = floorplan.image;
      img.onload = () => this.setBounds(img.width, img.height);
    }
  }

  componentWillUnmount = () => {
    const { mapRef } = this.state;

    if (mapRef) {
      const mapEl = mapRef.leafletElement;
      mapEl.removeEventListener('dblclick');
    }
  }

  handleMapInit = (mapRef: Map) => {
    this.setState({ mapRef });

    if (mapRef) {
      const mapEl = mapRef.leafletElement;
      mapEl.on('dblclick', (event: LeafletEvent) => console.log('clicked map', (event as LeafletMouseEvent).latlng));
    }
  }

  setBounds = (width: number, height: number) => {
    const { mapRef } = this.state;

    setTimeout(() => {
      if (mapRef) {
        const mapEl = mapRef!.leafletElement;

        // calculate the edges of the image, in coordinate space
        const southWest = mapEl.unproject([0, height], 0);
        const northEast = mapEl.unproject([width, 0], 0);
        const bounds = new LatLngBounds(southWest, northEast);

        this.setState({ width, height, bounds }, () => mapEl.invalidateSize());
      }
    });
  }

  render() {
    const { floorplan } = this.props;
    const { width, height, bounds } = this.state;

    return (
      <Fragment>
        <Map
          ref={this.handleMapInit}
          center={[0, 0]}
          zoom={0}
          maxZoom={1}
          minZoom={-1}
          attributionControl={false}
          zoomControl={true}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          boxZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
          crs={CRS.Simple}
          maxBounds={bounds || [[0, 0], [0, 0]]}
          style={{ width: width || 0, height: height || 0 }}
          className="collab__map"
        >
          {bounds && (
            <ImageOverlay
              url={floorplan.image}
              bounds={bounds}
            />
          )}
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
