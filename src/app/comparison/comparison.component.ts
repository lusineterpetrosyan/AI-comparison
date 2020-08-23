import { Component, Input, OnInit } from '@angular/core';
import { FakeApiService } from '../fake-api.service';
import { Agent } from '../fake-api';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {
   @Input() compareArray: Agent[];

  constructor(private service: FakeApiService) { }

  ngOnInit(): void {};

}
