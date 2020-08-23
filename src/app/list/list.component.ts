import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FakeApiService } from '../fake-api.service';
import { Agent, AgentId, Task, ScoreAvg } from '../fake-api';
import { averageScores } from '../utilities';

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
  show: number = -1;
  @Output() compareEvent: EventEmitter<Agent[]> = new EventEmitter<Agent[]>();

  constructor(private service: FakeApiService) { }

  ngOnInit(): void {
    this.service.listAgents().then(list => {
      this.list.push(...list);
    });
  }

  showDetails(agent: Agent) {
    this.show = this.agent && this.agent.id === agent.id ? -1 : agent.id;
    this.agent = agent;
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
  }

  calculateAvg(tasks: Task[]) {
    // Calculate the average and display.
    const initialVals = { avg: 0, n: 0 };

    const resultByCategory = tasks.reduce((r, o) => {
      if (r[o.category] || (r[o.category]=[])) r[o.category].push(o);

      return r;
    }, {});

    let averageScore;

    Object.keys(resultByCategory).map(result => {
      averageScore = resultByCategory[result].reduce(averageScores, initialVals).avg;

      this.categoriesAvg.push({ category: result, score: Math.round(averageScore) });

      return Math.round(averageScore);
    })
  }

}
