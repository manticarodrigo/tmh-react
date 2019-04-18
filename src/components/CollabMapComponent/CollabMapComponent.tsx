import React, { Component, Fragment } from 'react';
import './CollabMapComponent.scss';

import { CRS, DivIcon, LatLng, LatLngBounds, LeafletEvent, LeafletMouseEvent } from 'leaflet';
import { ImageOverlay, Map, Marker, Popup } from 'react-leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { Detail } from '../../reducers/ProjectReducer';

interface CollabMapComponentProps {
  workzoneRef: HTMLDivElement;
  floorplan: Detail;
}

interface CollabMapComponentState {
  mapRef?: Map;
  imageHeight?: number;
  bounds?: LatLngBounds;
}

export default class CollabMapComponent extends Component<CollabMapComponentProps, CollabMapComponentState> {
  state: CollabMapComponentState = {};

  componentDidMount = () => {
    const { floorplan } = this.props;
    if (floorplan) {
      const img = new Image();
      img.src = floorplan.image;
      img.onload = () => this.setMapBounds(img.width, img.height);
    }
  }

  componentWillUnmount = () => {
    const { mapRef } = this.state;

    if (mapRef) {
      const mapEl = mapRef.leafletElement;
      mapEl.removeEventListener('dblclick');
    }
  }

  getWorkzoneDimensions = () => {
    const { workzoneRef } = this.props;
    const { imageHeight } = this.state;

    let workzoneWidth = 0;
    let minHeight = 0;

    const workzoneStyle = window.getComputedStyle(workzoneRef, null);
    workzoneWidth = parseFloat(workzoneStyle.getPropertyValue('width'));
    workzoneWidth -= parseFloat(workzoneStyle.paddingLeft!) + parseFloat(workzoneStyle.paddingRight!);

    minHeight = Math.max(imageHeight || 0, workzoneRef.clientHeight);

    return { width: workzoneWidth, height: minHeight };
  }

  handleMapInit = (mapRef: Map) => {
    this.setState({ mapRef });

    if (mapRef) {
      const mapEl = mapRef.leafletElement;
      mapEl.on('dblclick', (event: LeafletEvent) => console.log('clicked map', (event as LeafletMouseEvent).latlng));
    }
  }

  setMapBounds = (width: number, height: number) => {
    const bounds = new LatLngBounds(new LatLng(-height, 0), new LatLng(0, width));

    this.setState({ imageHeight: height, bounds });
  }

  render() {
    const { floorplan } = this.props;
    const { bounds } = this.state;

    const { width, height } = this.getWorkzoneDimensions();

    return (
      <Fragment>
        {bounds && (
          <Map
            ref={this.handleMapInit}
            center={[0, 0]}
            zoom={0}
            maxZoom={1}
            minZoom={-1}
            attributionControl={false}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            crs={CRS.Simple}
            maxBounds={bounds || [[0, 0], [0, 0]]}
            style={{ width, height }}
            className="collab__map"
          >
              <ImageOverlay
                url={floorplan.image}
                bounds={bounds}
              />
            )}
            <Marker icon={markerDivIcon()} position={[-300, 400]}>
              <Popup>
                Popup for any custom information.
              </Popup>
            </Marker>
          </Map>
        )}
      </Fragment>
    );
  }
}

const markerDivIcon = (): DivIcon => new DivIcon({
  html: `1`,
  iconSize: [30, 30],
  className: 'collab__map__marker',
});
