import React, { useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { DivIcon, LatLngBounds } from 'leaflet';

interface CollabInfoMarkerProps {
  bounds: LatLngBounds;
}
const CollabInfoMarker = (props: CollabInfoMarkerProps) => {
  let markerRef: Marker;

  useEffect(() => {
    markerRef.leafletElement!.openPopup();
  });

  return (
    <Marker
      draggable
      ref={(ref) => { markerRef = ref!; }}
      position={[
        (props.bounds.getSouthWest().lat / 2),
        (props.bounds.getNorthEast().lng / 2),
      ]}
      icon={new DivIcon({
        html: '?',
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

export default React.memo(CollabInfoMarker);
