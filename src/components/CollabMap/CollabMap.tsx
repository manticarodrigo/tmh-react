import React, { Component, Fragment } from 'react';
import './CollabMap.scss';

import {
  CRS,
  DivIcon,
  LatLng,
  LatLngBounds,
  LeafletMouseEvent,
} from 'leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { ImageOverlay, Map, Marker, Popup } from 'react-leaflet';

import { Detail, Item } from '../../reducers/ProjectReducer';

import CollabFormMarker, { ItemForm } from './CollabFormMarker';
import CollabInfoMarker from './CollabInfoMarker';

interface CollabMapProps {
  floorplan: Detail;
}

interface CollabMapState {
  mapRef?: Map;
  height?: number;
  bounds?: LatLngBounds;
  items?: Item[];
  newItemForm?: ItemForm;
}

export default class CollabMap extends Component<CollabMapProps, CollabMapState> {
  state: CollabMapState = {};

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
    const { mapRef } = this.state;
    const { latlng } = event;
    const { lat, lng } = latlng;

    const map = mapRef!.leafletElement!;
    const paddedBounds = map.getBounds().pad(.5);
    map.zoomControl.remove();
    map.setMaxBounds(paddedBounds);

    const newItemForm: ItemForm = { position: [lat, lng] };
    this.setState({ newItemForm });
  }

  setMapBounds = (width: number, height: number) => (
    this.setState({
      height,
      bounds: new LatLngBounds(
        new LatLng(-height, 0),
        new LatLng(0, width),
      ),
    })
  )

  handlePopupClosed = () => {
    const { bounds, mapRef } = this.state;

    const map = mapRef!.leafletElement!;
    map.zoomControl.addTo(map);
    map.setMaxBounds(bounds!);
  }

  render() {
    const { floorplan } = this.props;
    const { height, bounds, items, newItemForm } = this.state;

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
            onpopupclose={this.handlePopupClosed}
            className="collab__map"
          >
            <ImageOverlay url={floorplan.image} bounds={bounds} />
            {items ? items.map((item, index) => (
              <Marker
                key={index}
                draggable
                icon={new DivIcon({
                  html: `${items.length + 1}`,
                  iconSize: [30, 30],
                  className: 'collab__map__marker',
                })}
                position={[item.lat, item.lng]}
              >
                <Popup>
                  Popup for any custom information.
                </Popup>
              </Marker>
            )) : (<CollabInfoMarker bounds={bounds} />)}
            {newItemForm && (
              <CollabFormMarker
                draggable
                items={items || []}
                position={newItemForm.position}
                handlePopupClosed={this.handlePopupClosed}
              />
            )}
          </Map>
        )}
      </Fragment>
    );
  }
}
