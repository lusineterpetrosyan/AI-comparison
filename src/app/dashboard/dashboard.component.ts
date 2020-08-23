import { Component, OnInit, Output } from '@angular/core';
import { Agent, AgentId } from '../fake-api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	@Output() compareArray: Agent[] = [];

  constructor() { }

  ngOnInit(): void {
  }


	  compare(newItem: Agent[]) {
	  	this.compareArray = newItem;
	  }
}