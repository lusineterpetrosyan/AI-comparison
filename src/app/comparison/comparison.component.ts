import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Agent } from '../fake-api';
import { averageScores, resultByType } from '../utilities';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})

export class ComparisonComponent implements OnInit {
   @Input() compareArray: Agent[];
   sorted: any[] = [];
   chart: any[] = [];
   combined: string = 'AI';

   @Output() resetCompareEvent: EventEmitter<any[]> = new EventEmitter<any[]>();

   // TODO: Chart vals and settings
   view: any[] = [500, 300];


  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'AI';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Avg. Score';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    // console.log('this.constructor =>', this.compareArray);
  }

  ngOnInit(): void {
    this.defaultChart();
    // TODO optimize array for score scheme
    // header options and structured data per row
  }

  backTo() {
    this.compareArray = [];
    this.resetCompareEvent.emit(this.compareArray);
  }

  defaultChart() {
    this.chart = [];
    this.sorted = [];
    this.combined = 'AI';
    this.compareArray.map(arr => {
      const byCategory = resultByType(arr.tasks, 'category');

      const categoriesAvg = [];
      Object.keys(byCategory).map(result => {
        const initialVals = { avg: 0, n: 0 };
        const averageScore = byCategory[result].reduce(averageScores, initialVals).avg;
        const avg = { name: result, value: Math.round(averageScore) };

        categoriesAvg.push(avg);
      })

      this.chart.push({ ...{ name: arr.name }, ...{ series: categoriesAvg} })
      this.sorted.push({ ...byCategory, ...{ name: arr.name }, ...{ avg: categoriesAvg } });
    })
  }

  combine() {
    let ch = [];
    let combined = [];
    this.combined = 'categories';

    this.sorted.map(sr => {
      sr.avg.map(avg => {
        const filter = ch.filter(v => v.name === avg.name);
        if(filter.length) {
          filter[0].series.push({ name: sr.name, value: avg.value });
          combined.push({...filter[0]});
        } else {
          ch.push({ ...{ name: avg.name }, ...{ series: [{ name: sr.name, value: avg.value }] }})
        }
      })
    })

    ch.length = 0;

    this.chart = combined;
  }

 // onSelect(data): void {
 //    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
 //  }

 //  onActivate(data): void {
 //    console.log('Activate', JSON.parse(JSON.stringify(data)));
 //  }

 //  onDeactivate(data): void {
 //    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
 // }
}
