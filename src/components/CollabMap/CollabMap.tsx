import React, { Component, Fragment } from 'react';
import './CollabMap.scss';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../../store/Store';

import {
  addItem,
  getItems,
} from '../../actions/ProjectActions';

import {
  CRS,
  LatLng,
  LatLngBounds,
  LeafletMouseEvent,
} from 'leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';

import { ImageOverlay, Map } from 'react-leaflet';

import { Detail, Item, ItemForm, Project } from '../../reducers/ProjectReducer';

import CollabFormMarker, { CollabFormMarkerState, ItemFieldErrors } from './CollabFormMarker';
import CollabInfoMarker from './CollabInfoMarker';
import CollabItemMarker from './CollabItemMarker';

interface CollabMapProps {
  project: Project;
  floorplan: Detail;
  getItems: (projectId: string) => Promise<Item[]>;
  addItem: (itemForm: ItemForm, project: Project) => Promise<Item>;
}

interface CollabMapState {
  mapRef?: Map;
  height?: number;
  bounds?: LatLngBounds;
  items?: Item[];
  newPoint?: [number, number];
  fieldErrors: ItemFieldErrors;
}

class CollabMap extends Component<CollabMapProps, CollabMapState> {
  state: CollabMapState = {
    fieldErrors: {},
  };

  componentDidMount = async () => {
    const { floorplan, project } = this.props;

    if (floorplan) {
      const img = new Image();
      img.src = floorplan.image;
      img.onload = () => this.setMapBounds(img.width, img.height);
    }

    if (project) {
      const items = await this.props.getItems(project.id);
      this.setState({ items: items.reverse() });
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

  handleFormSubmitted = async (form: CollabFormMarkerState) => {

    if (form.file) {
      const itemForm: ItemForm = {
        ...form,
        file: form.file,
        lat: form.position[0],
        lng: form.position[1],
      };

      try {
        await this.props.addItem(itemForm, this.props.project);
        const items = await this.props.getItems(this.props.project.id);
        this.setState({ items: items.reverse(), newPoint: undefined, fieldErrors: {} });
      } catch (error) {
        this.setState({ fieldErrors: error.data });
      }
    }
  }

  render() {
    const { floorplan } = this.props;
    const { height, bounds, items, newPoint, fieldErrors } = this.state;

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
                fieldErrors={fieldErrors}
                handleSubmit={this.handleFormSubmitted}
              />
            )}
          </Map>
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  getItems: (projectId: string) => dispatch(getItems(projectId)),
  addItem: (itemForm: ItemForm, project: Project) => dispatch(addItem(itemForm, project)),
});

export default connect(null, mapDispatchToProps)(CollabMap);
