import { Component, effect, inject, input, output } from '@angular/core';
import Device from '../types/Device';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DevicesService } from '../../../services/devices.service';
import { TimerComponent } from '../../../components/timer/timer.component';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RoleBasedDirective } from '../../../directives/role-based.directive';

@Component({
  selector: 'app-device-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    TimerComponent,
    RouterLink,
    ReactiveFormsModule,
    RoleBasedDirective,
  ],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.css',
})
export class DeviceCardComponent {
  deviceItem = input.required<Device>();
  deviceDeleted = output<string>();
  deviceReset = output<string>();
  startTimeId = output<string>();
  endTimeId = output<string>();
  sessionTypeChange = output<{ deviceId: string; sessionType: string }>();
  startedTime!: number;
  sessionTypes = ['DUO', 'MULTI'];

  sessionType = new FormControl();

  _deviceService = inject(DevicesService);
  constructor() {}

  onSessionTypeChange(event: Event, device: any) {
    const selectedSessionType = (event.target as HTMLSelectElement).value;
    this.sessionTypeChange.emit({
      deviceId: device._id,
      sessionType: selectedSessionType,
    });
  }

  deleteDevice(device: Device) {
    this.deviceDeleted.emit(device._id);
  }

  resetDevice(device: Device) {
    this.deviceReset.emit(device._id);
  }

  startTimeDevice(device: Device) {
    this.startTimeId.emit(device._id);
  }

  endTimeDevice(device: Device) {
    this.endTimeId.emit(device._id);
  }
}
