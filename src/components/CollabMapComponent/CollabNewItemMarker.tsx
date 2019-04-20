import React, { useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { DivIcon, marker } from 'leaflet';

import { Item } from '../../reducers/ProjectReducer';

interface CollabNewItemProps {
  draggable?: boolean;
  items: Item[];
  position: [number, number];
}

export interface ItemForm {
  position: [number, number];
  make?: string;
  type?: string;
  price?: number;
  inspiration?: string;
  file?: File;
}

const CollabNewItemMarker = (props: CollabNewItemProps) => {
  const { draggable, position, items } = props;

  let markerRef: Marker;

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
        Double click to set a new pin or drag to move around.
      </Popup>
    </Marker>
  );
};

export default React.memo(CollabNewItemMarker);
