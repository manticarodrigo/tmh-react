import React, { Component, ReactNode } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { DivIcon } from 'leaflet';

interface CollabNewItemProps {
  children: ReactNode;
  draggable?: boolean;
  icon: DivIcon;
  position: [number, number];
}

interface CollabNewItemState {
  markerRef?: Marker;
}

export interface ItemForm {
  position: [number, number];
  make?: string;
  type?: string;
  price?: number;
  inspiration?: string;
  file?: File;
}

class CollabNewItemMarker extends Component<CollabNewItemProps, CollabNewItemState> {
  state: CollabNewItemState = {};

  handleMarkerRef = (marker: Marker) => {
    this.setState({ markerRef: marker }, () => {
      const markerEl = marker.leafletElement;
      markerEl.openPopup();
    });
  }

  render() {
    const { draggable, position, icon } = this.props;

    return (
      <Marker
        draggable={draggable}
        ref={this.handleMarkerRef}
        position={position}
        icon={icon}
      >
        <Popup>
          Double click to set a new pin or drag to move around.
        </Popup>
      </Marker>
    );
  }
}

export const divIcon = (html: string): DivIcon => new DivIcon({
  html,
  iconSize: [30, 30],
  className: 'collab__map__marker',
});

export default React.memo(CollabNewItemMarker);
