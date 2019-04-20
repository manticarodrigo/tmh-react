import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { DivIcon, DragEndEvent } from 'leaflet';

import { Item } from '../../reducers/ProjectReducer';

interface CollabFormMarkerProps {
  items: Item[];
  position: [number, number];
  handleSubmit: (form: CollabFormMarkerState) => void;
}

export interface CollabFormMarkerState {
  position: [number, number];
  make: string;
  type: string;
  price: string;
  inspiration: string;
  file?: File;
}

const CollabFormMarker = (props: CollabFormMarkerProps) => {
  const { position, items } = props;
  const [state, setState] = useState<CollabFormMarkerState>({
    position,
    type: '',
    make: '',
    price: '',
    inspiration: '',
    file: undefined,
  });

  let markerRef: Marker;
  let fileInput: HTMLInputElement;

  useEffect(() => {
    markerRef.leafletElement!.openPopup();
  });

  const handleDragend = (e: DragEndEvent) => {
    const point = e.target;
    const latlng = point.getLatLng();
    const { lat, lng } = latlng;

    setState({ ...state, position: [lat, lng] });
  };

  const handleClickFileInput = () => fileInput.click();

  const handleFileChanged = (e: React.SyntheticEvent<HTMLInputElement>) =>  {
    const { files } = e.currentTarget;

    if (files) {
      const file = files[0];
      setState({ ...state, file });
    }
  };

  const handleInputChanged = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => props.handleSubmit(state);

  return (
    <Marker
      draggable
      ref={(ref) => { markerRef = ref!; }}
      position={state.position}
      ondragend={handleDragend}
      icon={new DivIcon({
        html: `${items.length + 1}`,
        iconSize: [30, 30],
        className: 'collab__map__marker',
      })}
    >
      <Popup>
        <div className="collab__item__form">
          <h3 className="h2 u-text-uppercase">Item</h3>
          <p>Please enter the required details</p>
          <input
            type="text"
            name="make"
            placeholder="Item make"
            value={state.make}
            onChange={handleInputChanged}
            className="u-placeholder-uppercase"
          />
          <input
            type="text"
            name="type"
            placeholder="Item type"
            value={state.type}
            onChange={handleInputChanged}
            className="u-placeholder-uppercase"
          />
          <input
            type="text"
            name="price"
            placeholder="Item Price"
            value={state.price}
            onChange={handleInputChanged}
            className="u-placeholder-uppercase"
          />
          <input
            type="text"
            name="inspiration"
            placeholder="Inspiration url"
            value={state.inspiration}
            onChange={handleInputChanged}
            className="u-placeholder-uppercase"
          />
          <button className="u-text-uppercase" onClick={handleClickFileInput}>Upload Image</button>
          {state.file && (<p className="collab__map__success">Selected {state.file.name}</p>)}
          <input
            ref={(ref: HTMLInputElement) => { fileInput = ref; }}
            type="file"
            accept="image/*"
            className="u-spaceless"
            onChange={handleFileChanged}
          />
          <button className="u-text-uppercase" onClick={handleSubmit}>Save</button>
        </div>
      </Popup>
    </Marker>
  );
};

export default React.memo(CollabFormMarker);
