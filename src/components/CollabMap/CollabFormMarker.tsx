import React, { useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { DivIcon } from 'leaflet';

import { Item } from '../../reducers/ProjectReducer';

interface CollabFormMarkerProps {
  draggable?: boolean;
  items: Item[];
  position: [number, number];
  handlePopupClosed: () => void;
}

export interface ItemForm {
  position: [number, number];
  make?: string;
  type?: string;
  price?: number;
  inspiration?: string;
  file?: File;
}

const CollabFormMarker = (props: CollabFormMarkerProps) => {
  const { draggable, position, items } = props;

  let markerRef: Marker;
  let fileInput: HTMLInputElement;
  let selectedFile: File;

  const handleClickFileInput = () => fileInput.click();

  const handleFileChanged = (e: React.SyntheticEvent<HTMLInputElement>) =>  {
    const { files } = e.currentTarget;

    if (files) {
      const file = files[0];
      selectedFile = file;
      console.log(file);
    }
  };

  useEffect(() => {
    markerRef.leafletElement!.openPopup();
  });

  return (
    <Marker
      draggable={draggable}
      ref={(ref) => { markerRef = ref!; }}
      position={position}
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
          <input type="text" placeholder="Item make" className="u-placeholder-uppercase" />
          <input type="text" placeholder="Item type" className="u-placeholder-uppercase" />
          <input type="text" placeholder="Price" className="u-placeholder-uppercase" />
          <input type="text" placeholder="Source" className="u-placeholder-uppercase" />
          <button className="u-text-uppercase" onClick={handleClickFileInput}>Upload Image</button>
          <input
            ref={(ref: HTMLInputElement) => { fileInput = ref; }}
            type="file"
            accept="image/*"
            className="u-spaceless"
            onChange={handleFileChanged}
          />
          <button className="u-text-uppercase">Save</button>
        </div>
      </Popup>
    </Marker>
  );
};

export default React.memo(CollabFormMarker);
