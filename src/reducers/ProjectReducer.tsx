import { Reducer } from 'redux';

import {
  ProjectActions,
  ProjectActionTypes,
} from '../actions/ProjectActions';

import { User } from './AuthReducer';

export class Project {
  readonly id!: string;
  readonly created_date!: string;
  readonly modified_date!: string;
  readonly start_date!: string;
  readonly end_date!: string;
  readonly client!: User;
  readonly designer?: User;
  readonly room!: string;
  status!: ProjectStatus;
  readonly shared_with!: string;
  readonly budget!: string;
  readonly pet_friendly!: boolean;
  readonly limited_access!: boolean;
  readonly style!: string;
  readonly zipcode!: number;
  designer_note!: string;
  final_note!: string;
  revision_count!: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  getReadableModifiedDate = (): string => new Date(this.modified_date!).toLocaleDateString('en-US');

  getReadableRoom = (): string => {
    const types: { [index: string]: string } = {
      BEDROOM: 'Bedroom',
      LIVING_ROOM: 'Living Room',
      MULTIPURPOSE_ROOM: 'Multipurpose Room',
      STUDIO: 'Studio',
      DINING_ROOM: 'Dining Room',
      HOME_OFFICE: 'Office',
    };

    return types[this.room];
  }

  getReadableStatus = (): string => {
    const statuses: { [index: string]: string } = {
      DETAILS: 'Details',
      DESIGN: 'Design',
      CONCEPTS: 'Concepts',
      FLOOR_PLAN: 'Floor Plan',
      REQUEST_ALTERNATIVES: 'Request Alternatives',
      ALTERNATIVES_READY: 'Alternatives Ready',
      FINAL_DELIVERY: 'Final Delivery',
      SHOPPING_CART: 'Shopping Cart',
      ESTIMATE_SHIPPING_AND_TAX: 'Estimate Shipping & Tax',
      CHECKOUT: 'Checkout',
      ARCHIVED: 'Archived',
    };

    return statuses[this.status];
  }

  getReadableTimeLeft = (): string => {
    if (this.end_date) {
      const date = new Date(this.end_date);
      date.setDate(date.getDate());
      const now = new Date();
      const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      const interval = Math.floor(seconds / 86400); // days
      const abs = Math.abs(interval);
      if (interval <= 0 && abs >= 0) {
        return abs.toString();
      }
    }
    return 'N/A';
  }
}

export enum ProjectStatus {
  DETAILS = 'DETAILS',
  DESIGN = 'DESIGN',
  CONCEPTS = 'CONCEPTS',
  FLOOR_PLAN = 'FLOOR_PLAN',
  REQUEST_ALTERNATIVES = 'REQUEST_ALTERNATIVES',
  ALTERNATIVES_READY = 'ALTERNATIVES_READY',
  FINAL_DELIVERY = 'FINAL_DELIVERY',
  SHOPPING_CART = 'SHOPPING_CART',
  ESTIMATE_SHIPPING_AND_TAX = 'ESTIMATE_SHIPPING_AND_TAX',
  CHECKOUT = 'CHECKOUT',
  ARCHIVED = 'ARCHIVED',
}

export interface Detail {
  readonly id: string;
  readonly created_date: string;
  readonly modified_date: string;
  readonly project: string;
  image: string;
  status: DetailStatus;
  type: DetailType;
}

export enum DetailStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
}

export enum DetailType {
  DRAWING = 'DRAWING',
  INSPIRATION = 'INSPIRATION',
  FURNITURE = 'FURNITURE',
  CONCEPT = 'CONCEPT',
  FLOOR_PLAN = 'FLOOR_PLAN',
  FINAL_SNAPSHOT = 'FINAL_SNAPSHOT',
}

export interface Item {
  readonly id: string;
  readonly created_date: string;
  readonly modified_date: string;
  readonly project: string;
  parent?: string;
  image: string;
  status: ItemStatus;
  make: string;
  type: string;
  price: string;
  inspiration: string;
  lat: number;
  lng: number;
}

export enum ItemStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENGIN',
  SUBMITTED = 'SUBMITTED',
  REQUEST_ALTERNATIVE = 'REQUEST_ALTERNATIVE',
  ALTERNATE_READY = 'ALTERNATE_READY',
}

export interface ProjectState {
  readonly projects?: Project[];
}

const defaultProjectState: ProjectState = {
  projects: undefined,
};

export const ProjectReducer: Reducer<ProjectState, ProjectActions> = (
  state = defaultProjectState,
  action,
) => {
  switch (action.type) {
    case ProjectActionTypes.GET_PROJECTS: {
      return {
        ...state,
        projects: action.projects,
      };
    }
    case ProjectActionTypes.CREATE_PROJECT: {
      return {
        ...state,
        projects: [
          ...(state.projects || []),
          action.project,
        ],
      };
    }
    default:
      return state;
  }
};