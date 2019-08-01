import React, { Fragment, useEffect, useState } from 'react';
import { ImageOverlay, Map } from 'react-leaflet';
import './CollabMap.scss';
import {
  CRS,
  LatLng,
  LatLngBounds,
  LeafletMouseEvent,
} from 'leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { Detail, Item, ItemForm } from 'store/reducers/ProjectReducer';

import CollabFormMarker, { CollabFormMarkerState, ItemFieldErrors } from './CollabFormMarker';
import CollabInfoMarker from './CollabInfoMarker';
import CollabItemMarker from './CollabItemMarker';

type CollabMapProps = {
  floorplan: Detail;
  items?: Item[];
  handleGetItems: () => void;
  handleAddItem: (itemForm: ItemForm) => void;
};

type CollabMapState = {
  height?: number;
  bounds?: LatLngBounds;
  newPoint?: [number, number];
};

export const CollabMap = (props: CollabMapProps) => {
  const [state, setState] = useState<CollabMapState>({});
  const { floorplan, items } = props;
  const { height, bounds, newPoint } = state;

  let mapRef: Map;

  useEffect(() => {
    if (floorplan) {
      const img = new Image();
      img.src = floorplan.image;
      img.onload = () => setMapBounds(img.width, img.height);
    }
  }, [floorplan]);

  const handleDblClick = (event: LeafletMouseEvent) => {
    const { latlng } = event;
    const { lat, lng } = latlng;

    setState({ ...state, newPoint: [lat, lng] });
  };

  const setMapBounds = (imgWidth: number, imgHeight: number) => (
    setState({
      ...state,
      height: imgHeight,
      bounds: new LatLngBounds(
        new LatLng(-imgHeight, 0),
        new LatLng(0, imgWidth),
      ),
    })
  );

  const handlePopupOpened = () => {
    const map = mapRef!.leafletElement!;
    const paddedBounds = map.getBounds().pad(.5);
    map.zoomControl.remove();
    map.setMaxBounds(paddedBounds);
  };

  const handlePopupClosed = () => {
    const map = mapRef!.leafletElement!;
    map.zoomControl.addTo(map);
    map.setMaxBounds(bounds!);

    setState({ ...state, newPoint: undefined });
  };

  const handleFormSubmitted = async (
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
      await props.handleAddItem(itemForm);
    } catch (error) {
      callback(error.data);
    }
  };

  return (
    <Fragment>
      {height && bounds && (
        <Map
          className="collab__map"
          ref={(ref) => { mapRef = ref!; }}
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
          ondblclick={handleDblClick}
          onpopupopen={handlePopupOpened}
          onpopupclose={handlePopupClosed}
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
              handleSubmit={handleFormSubmitted}
            />
          )}
        </Map>
      )}
    </Fragment>
  );
};

export default CollabMap;
