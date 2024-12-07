import Device from './Device';

export enum SessionTypes {
  DUO = 'DUO',
  MULTI = 'MULTI',
}

export default interface Session {
  _id: string;
  device: Device;
  type: SessionTypes;
  estimatedTimeInHours: number;
  gamePrice: number;
  sessionPrice: number;
  createdAt: string;
  updatedAt: string;
}
