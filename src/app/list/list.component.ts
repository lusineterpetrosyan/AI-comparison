import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FakeApiService } from '../fake-api.service';
import { Agent, AgentId, Task, ScoreAvg } from '../fake-api';
import { averageScores, resultByType } from '../utilities';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  list: Agent[] = [];
  agent: Agent;
  compareList: Agent[] = [];
  categoriesAvg: ScoreAvg[] = [];
  selected: AgentId[] = [];
  searchText: string;
  hover: string;
  show: number = -1;

  // @Output() resultByType: {} = {}; // TODO allow to pass to child component
  @Output() compareEvent: EventEmitter<Agent[]> = new EventEmitter<Agent[]>();

  constructor(private service: FakeApiService) { }

  ngOnInit(): void {
    this.service.listAgents().then(list => {
      this.list.push(...list);
    });
  }

  showDetails(agent: Agent) {
    const opened = (this.agent && this.agent.id === agent.id);
    this.show = opened ? -1 : agent.id;
    this.agent = !opened ? agent : undefined;

    // reset 
    this.categoriesAvg = [];

    this.calculateAvg(agent.tasks);
  }

  selectToCompare(id: AgentId) {
    if (this.compareList.length < 2) {
      this.service.getAgent(id).then(agent => {
        this.compareList.push(agent);
      })
    }
  }

  deselect(id: AgentId) {
    this.compareList = this.compareList.filter(item => item.id != id);
    const index = this.selected.indexOf(id);
    if (index > -1) this.selected.splice(index, 1);
  }

  compare() {
    this.compareEvent.emit(this.compareList);
    this.compareList = [];
  }

  calculateAvg(tasks: Task[]) {
    // Calculate the average
    const initialVals = { avg: 0, n: 0 };

    const byCategory = resultByType(tasks, 'category');

    let averageScore;
    Object.keys(byCategory).map(result => {
      averageScore = byCategory[result].reduce(averageScores, initialVals).avg;

      this.categoriesAvg.push({ category: result, score: Math.round(averageScore), tasks: byCategory[result] });

      return Math.round(averageScore);
    })
  }

}
