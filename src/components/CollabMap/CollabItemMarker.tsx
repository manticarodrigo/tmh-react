import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { DivIcon } from 'leaflet';

import { Item } from 'store/reducers/ProjectReducer';

type CollabItemMarkerProps = {
  index: number;
  item: Item;
};

const CollabItemMarker = (props: CollabItemMarkerProps) => {
  const { index, item } = props;

  return (
    <Marker
      position={[item.lat, item.lng]}
      icon={new DivIcon({
        className: 'collab__map__marker',
        html: `${index + 1}`,
        iconSize: [30, 30],
      })}
    >
      <Popup className="collab__map__popup">
        <div
          className="collab__map__popup__image"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <p className="h2">{item.make}</p>
        <p>{item.type}</p>
        <p className="h2">${item.price}</p>
      </Popup>
    </Marker>
  );
};

export default CollabItemMarker;
