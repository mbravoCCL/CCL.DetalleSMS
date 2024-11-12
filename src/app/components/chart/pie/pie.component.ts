import { Component, Input } from '@angular/core';
import { NgxChartsModule, PieData } from '@swimlane/ngx-charts';
import {  Pie } from '../../../interface/Pie';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss'
})
export class PieComponent {

  view :any = [700, 400];

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

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