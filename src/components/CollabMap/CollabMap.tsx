import React, { Component, Fragment } from 'react';
import './CollabMap.scss';

import {
  CRS,
  LatLng,
  LatLngBounds,
  LeafletMouseEvent,
} from 'leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { ImageOverlay, Map } from 'react-leaflet';

import { Detail, Item, ItemForm } from '../../reducers/ProjectReducer';

import CollabFormMarker, { CollabFormMarkerState, ItemFieldErrors } from './CollabFormMarker';
import CollabInfoMarker from './CollabInfoMarker';
import CollabItemMarker from './CollabItemMarker';

interface CollabMapProps {
  floorplan: Detail;
  items?: Item[];
  handleGetItems: () => void;
  handleAddItem: (itemForm: ItemForm) => void;
}

interface CollabMapState {
  mapRef?: Map;
  height?: number;
  bounds?: LatLngBounds;
  newPoint?: [number, number];
}

class CollabMap extends Component<CollabMapProps, CollabMapState> {
  state: CollabMapState = {};

  componentDidMount = async () => {
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

    this.setState({ newPoint: [lat, lng] });
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

  handlePopupOpened = () => {
    const { mapRef } = this.state;

    const map = mapRef!.leafletElement!;
    const paddedBounds = map.getBounds().pad(.5);
    map.zoomControl.remove();
    map.setMaxBounds(paddedBounds);
  }

  handlePopupClosed = () => {
    const { bounds, mapRef } = this.state;

    const map = mapRef!.leafletElement!;
    map.zoomControl.addTo(map);
    map.setMaxBounds(bounds!);

    this.setState({ newPoint: undefined });
  }

  handleFormSubmitted = async (
    form: CollabFormMarkerState,
    callback: (fieldErrors: ItemFieldErrors) => void,
  ) => {
    const itemForm: ItemForm = {
      ...form,
      file: form.file,
      lat: form.position[0],
      lng: form.position[1],
    };

    try {
      await this.props.handleAddItem(itemForm);
    } catch (error) {
      callback(error.data);
    }
  }

  render() {
    const { floorplan, items } = this.props;
    const { height, bounds, newPoint } = this.state;

    return (
      <Fragment>
        {height && bounds && (
          <Map
            className="collab__map"
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
            onpopupopen={this.handlePopupOpened}
            onpopupclose={this.handlePopupClosed}
          >
            <ImageOverlay url={floorplan.image} bounds={bounds} />
            {items ? items.map((item, index) => (
              <CollabItemMarker
                key={index}
                index={index}
                item={item}
              />
            )) : (<CollabInfoMarker bounds={bounds} />)}
            {newPoint && (
              <CollabFormMarker
                items={items || []}
                position={newPoint}
                handleSubmit={this.handleFormSubmitted}
              />
            )}
          </Map>
        )}
      </Fragment>
    );
  }
}

export default React.memo(CollabMap);
