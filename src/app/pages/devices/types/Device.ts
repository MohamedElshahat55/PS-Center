import { SessionTypes } from './Session';

export default interface Device {
  _id: string;
  name: string;
  type: string;
  sessionType: SessionTypes;
  multiPricePerHour: number;
  duoPricePerHour: number;
  isEmpty: boolean;
  startTime: number | null;
  endTime: number | null;
  order: string | null;
  createdAt: string;
  updatedAt: string;
}
