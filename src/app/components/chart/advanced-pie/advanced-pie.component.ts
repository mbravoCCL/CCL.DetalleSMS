import { Component, Input } from '@angular/core';
import { NgxChartsModule, PieData } from '@swimlane/ngx-charts';
import {  Pie } from '../../../interface/Pie';

@Component({
  selector: 'app-advanced-pie',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './advanced-pie.component.html',
  styleUrl: './advanced-pie.component.scss'
})
export class AdvancedPieComponent {
  view :any = [400, 220];

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  @Input() pieData!: Pie[];
  @Input() colorScheme!: any;

  constructor() {
    Object.assign(this,  this.pieData );
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}