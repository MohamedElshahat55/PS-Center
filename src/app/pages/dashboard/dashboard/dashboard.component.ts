import { Component, inject, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import {
  DashboardService,
  DocsCountI,
} from '../../../services/dashboard.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  _dashboardService = inject(DashboardService);

  //? Observables
  docsCounts$: Observable<any> = this._dashboardService.getDocsCount().pipe(
    map((res) => {
      const dataArray = Object.entries(res.data).map(([key, value]) => ({
        key,
        value,
      }));
      return dataArray;
    })
  );

  //?Varablies
  sessionTypePrec: any;
  devicePrec: any;
  orderProfits: any;
  basicData: any;
  basicOptions: any;
  data: any;
  options: any;
  data2: any;
  options2: any;

  ngOnInit() {
    this._dashboardService.getSessionsMonthlyProfits().subscribe((res) => {
      this.sessionTypePrec = res.data.percentage[0];
      this.updateChartDataForSessions();
    });
    this._dashboardService.getOrderTypesPercentages().subscribe((res) => {
      this.devicePrec = res.data.percentage[0];
      this.updateChartDataForDevices();
    });

    this._dashboardService.getOrdersMonthlyProfits().subscribe((res) => {
      this.orderProfits = res.data.profits;
      this.createChartDataForOrders();
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.options = this.createChartOptions(textColor); // Default chart options
    this.options2 = this.createChartOptions(textColor);

    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  // CHART FOR ORDERS
  private createChartDataForOrders() {
    const profitDataByMonth: { [key: string]: number } = {};

    this.orderProfits.forEach((item: any) => {
      const { type, month, year } = item._id;
      const label = `${this.getMonthName(month)}-${year}-${type}`; // Create label in "Month-Year" format

      // Add profit value to the corresponding label
      if (!profitDataByMonth[label]) {
        profitDataByMonth[label] = 0;
      }
      profitDataByMonth[label] += item.value;
    });

    // Prepare the chart labels and data arrays
    const labels = Object.keys(profitDataByMonth); // Labels based on "Month-Year"
    const data = Object.values(profitDataByMonth);

    this.basicData = {
      labels: labels,
      datasets: [
        {
          label: 'Order Monthely Profits',
          data: data,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  // CHART FOR SESSIONS
  private updateChartDataForSessions() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.data = {
      labels: ['DUE Session', 'MULTI Session'],
      datasets: [
        {
          data: [
            this.sessionTypePrec.DuoPercentage,
            this.sessionTypePrec.MultiPercentage,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
          ],
        },
      ],
    };
  }
  // CHART FOR DEVICES
  private updateChartDataForDevices() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.data2 = {
      labels: ['IN_DEVICE_ORDER', 'OUT_DEVICE_ORDER'],
      datasets: [
        {
          data: [
            this.devicePrec.InDevicePercentage,
            this.devicePrec.OutDevicePercentage,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
          ],
        },
      ],
    };
  }

  private createChartOptions(textColor: string) {
    return {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }

  private getMonthName(month: number): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[month - 1]; // month is 1-based, so subtract 1 for zero-based index
  }
}
