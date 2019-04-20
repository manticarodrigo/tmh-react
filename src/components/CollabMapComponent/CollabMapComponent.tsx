import React, { Component, Fragment } from 'react';
import './CollabMapComponent.scss';

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

import CollabInfoMarker from './CollabInfoMarker';
import CollabNewItemMarker, { ItemForm } from './CollabNewItemMarker';

interface CollabMapComponentProps {
  floorplan: Detail;
}

interface CollabMapComponentState {
  mapRef?: Map;
  height?: number;
  bounds?: LatLngBounds;
  items?: Item[];
  newItemForm?: ItemForm;
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
    const { latlng } = event;
    const { lat, lng } = latlng;

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

  render() {
    const { floorplan } = this.props;
    const { height, bounds, items, newItemForm } = this.state;

    const newItemFormKey = (form: ItemForm) => `${form.position[0]}-${form.position[1]}}`;

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
              <CollabNewItemMarker
                draggable
                key={newItemFormKey(newItemForm)}
                items={items || []}
                position={newItemForm.position}
              />
            )}
          </Map>
        )}
      </Fragment>
    );
  }
}
