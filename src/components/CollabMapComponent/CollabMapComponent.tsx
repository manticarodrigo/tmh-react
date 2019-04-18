import React, { Component, Fragment } from 'react';
import './CollabMapComponent.scss';

import {
  CRS,
  DivIcon,
  LatLng,
  LatLngBounds,
  LatLngExpression,
  LeafletEvent,
  LeafletMouseEvent,
} from 'leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { ImageOverlay, Map, Marker, Popup } from 'react-leaflet';

import { Detail, Item } from '../../reducers/ProjectReducer';

interface CollabMapComponentProps {
  floorplan: Detail;
}

interface CollabMapComponentState {
  mapRef?: Map;
  height?: number;
  bounds?: LatLngBounds;
  items?: Item[];
  itemForm?: ItemForm;
}

interface ItemForm {

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

  handleMapInit = (mapRef: Map) => this.setState({ mapRef });

  handleDblClick = (event: LeafletMouseEvent) => {
    const ltlng = event.latlng;
    const items = this.state.items || [];

    // this.setState({ items: [...items, ]})
  }

  setMapBounds = (width: number, height: number) => (
    this.setState({
      height,
      bounds: new LatLngBounds(new LatLng(-height, 0), new LatLng(0, width)),
    })
  )

  render() {
    const { floorplan } = this.props;
    const { height, bounds, items } = this.state;

    return (
      <Fragment>
        {height && bounds && (
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
            maxBounds={bounds}
            style={{ minHeight: height }}
            ondblclick={this.handleDblClick}
            className="collab__map"
          >
            <ImageOverlay url={floorplan.image} bounds={bounds} />
            {items ? items.map((item, index) => (
              <Marker
                key={index}
                icon={markerDivIcon(`${index + 1}`)}
                position={[item.lat, item.lng]}
                draggable
              >
                <Popup>
                  Popup for any custom information.
                </Popup>
              </Marker>
            )) : (
              <Marker
                draggable
                icon={markerDivIcon('*')}
                position={[
                  (bounds.getSouthWest().lat / 2),
                  (bounds.getNorthEast().lng / 2),
                ]}
              >
                <Popup>
                  Double click to set a new pin or drag to move around.
                </Popup>
              </Marker>
            )}
          </Map>
        )}
      </Fragment>
    );
  }
}

const markerDivIcon = (html: string): DivIcon => new DivIcon({
  html,
  iconSize: [30, 30],
  className: 'collab__map__marker',
});
