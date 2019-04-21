import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { DivIcon, DragEndEvent } from 'leaflet';

import Input from '../Input/Input';

import { Item } from '../../reducers/ProjectReducer';

interface CollabFormMarkerProps {
  items: Item[];
  position: [number, number];
  handleSubmit: (
    form: CollabFormMarkerState,
    callback: (fieldErrors: ItemFieldErrors) => void,
  ) => void;
}

export interface CollabFormMarkerState {
  position: [number, number];
  make: string;
  type: string;
  price: string;
  inspiration: string;
  file?: File;
  fieldErrors: ItemFieldErrors;
}

export interface ItemFieldErrors {
  make?: string[];
  type?: string[];
  price?: string[];
  inspiration?: string[];
  file?: string[];

  [propName: string]: string[] | undefined;
}

const CollabFormMarker = (props: CollabFormMarkerProps) => {
  const { position, items } = props;
  const [state, setState] = useState<CollabFormMarkerState>({
    position,
    type: '',
    make: '',
    price: '',
    inspiration: '',
    fieldErrors: {},
  });

  let markerRef: Marker;
  let fileInput: HTMLInputElement;

  useEffect(() => {
    markerRef.leafletElement!.openPopup();
  }, []);

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
      setState({
        ...state,
        file,
        fieldErrors: {
          ...state.fieldErrors,
          image: undefined,
        },
      });
    }
  };

  const handleInputChanged = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setState({
      ...state,
      [name]: value,
      fieldErrors: {
        ...state.fieldErrors,
        [name]: undefined,
      },
    });
  };

  const handleSubmit = () => {
    props.handleSubmit(state, (fieldErrors: ItemFieldErrors) => (
      setState({
        ...state,
        fieldErrors,
      })
    ));
  };

  return (
    <Marker
      ref={(ref) => { markerRef = ref!; }}
      position={state.position}
      ondragend={handleDragend}
      icon={new DivIcon({
        html: `${items.length + 1}`,
        iconSize: [30, 30],
        className: 'collab__map__marker',
      })}
    >
      <Popup className="collab__map__popup">
        <div className="collab__item__form">
          <h3 className="h2 u-text-uppercase">Item</h3>
          <p>Please enter the required details</p>
          <Input
            type="text"
            name="make"
            value={state.make}
            placeholder="Item make"
            fieldErrors={state.fieldErrors}
            onChange={handleInputChanged}
          />
          <Input
            type="text"
            name="type"
            value={state.type}
            placeholder="Item type"
            fieldErrors={state.fieldErrors}
            onChange={handleInputChanged}
          />
          <Input
            type="text"
            name="price"
            value={state.price}
            placeholder="Item Price"
            fieldErrors={state.fieldErrors}
            onChange={handleInputChanged}
          />
          <Input
            type="text"
            name="inspiration"
            value={state.inspiration}
            placeholder="Inspiration url"
            fieldErrors={state.fieldErrors}
            onChange={handleInputChanged}
          />
          <div className="form__item">
            <div className="form__item__inner">
              <button className="u-text-uppercase" onClick={handleClickFileInput}>Upload Image</button>
              {state.file && (
                <p className="u-margin-hug--vert form__status form__status--success">Selected {state.file.name}</p>
              )}
              {state.fieldErrors.image && (
                <p className="u-margin-hug--vert form__status form__status--error">This field may not be blank.</p>
              )}
            </div>
          </div>
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
