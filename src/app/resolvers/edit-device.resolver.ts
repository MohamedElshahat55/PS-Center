import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import {
  devicesResult,
  DevicesService,
  GetOneDevice,
} from '../services/devices.service';
import Device from '../pages/devices/types/Device';

export const editDeviceResolver: ResolveFn<Device | null> = (route, state) => {
  const _deviceService = inject(DevicesService);
  const deviceId = route.paramMap.get('device-id');

  if (!deviceId) {
    return null;
  }

  return _deviceService.getDevice(deviceId);
};
