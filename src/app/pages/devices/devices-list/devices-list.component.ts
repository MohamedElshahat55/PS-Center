import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, inject } from '@angular/core';
import { DevicesService } from '../../../services/devices.service';
import { DeviceCardComponent } from '../device-card/device-card.component';
import Device from '../types/Device';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionsService } from '../../../services/sessions.service';
import { RoleBasedDirective } from '../../../directives/role-based.directive';

@Component({
  selector: 'app-devices-list',
  standalone: true,
  imports: [DeviceCardComponent, AsyncPipe, RouterLink, RoleBasedDirective],
  templateUrl: './devices-list.component.html',
  styleUrl: './devices-list.component.css',
})
export class DevicesListComponent {
  _deviceService = inject(DevicesService);
  _sessionsService = inject(SessionsService);
  _destroyRef = inject(DestroyRef);
  _toastr = inject(ToastrService);
  _router = inject(Router);
  devices$!: Observable<Device[]>;
  isStarted!: boolean;

  selectedSessionType: string = '';

  ngOnInit(): void {
    this.loadAllDevices();
  }

  loadAllDevices() {
    this.devices$ = this._deviceService.loadAllDevices().pipe(
      takeUntilDestroyed(this._destroyRef),
      map((devices) => {
        return devices.data.docs;
      })
    );
  }

  onDeviceDeleted(deletedDeviceId: string) {
    this._deviceService.deleteDevice(deletedDeviceId).subscribe({
      next: () => {
        this._toastr.success('Successfully deleted');
      },
      error: () => {
        this._toastr.error('Something is wrong! Please try again.');
      },
    });
    this.loadAllDevices();
  }

  onStartTimeDevice(deviceId: string) {
    this._deviceService.startTime(deviceId).subscribe({
      next: () => {
        this.loadAllDevices();
        this._toastr.success('Time Started');
      },
    });
  }

  onEndTimeDevice(deviceId: string) {
    this._deviceService.endTime(deviceId).subscribe({
      next: () => {
        this.loadAllDevices();
        this._toastr.info('Time Ended, New Session Added Successfully');
        this._router.navigateByUrl('/sessions');
      },
    });
  }

  onDeviceReset(devicId: string) {
    this._deviceService.resetDevice(devicId).subscribe({
      next: () => {
        this.loadAllDevices();
        this._toastr.info('Devices Reset Successfully');
      },
    });
  }

  handleSessionTypeChange(event: { deviceId: string; sessionType: string }) {
    this._deviceService
      .editDeviceSessionType(event.deviceId, event.sessionType)
      .subscribe({
        next: () => {
          this.loadAllDevices();
          this._toastr.success('Successfully Edited');
        },
      });
  }

  resetAllDevices() {
    this._deviceService.resetAllDevices().subscribe({
      next: (res) => {
        if (res.status === 'sucess') {
          this._toastr.success('Devices Reset Successfully');
          this.loadAllDevices();
        }
      },
    });
  }
}
