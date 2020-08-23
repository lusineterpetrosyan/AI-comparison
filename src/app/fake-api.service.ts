import { Injectable } from '@angular/core';

import { AGENTS } from './fake-data';
import { Agent, AgentId } from './fake-api';
import { asFallibleAsyncResponse } from './utilities';


@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  constructor() { }

  listAgents(): Promise<ReadonlyArray<Agent>> {
    return asFallibleAsyncResponse(AGENTS);
  }
  searchAgents(nameSubstr: string): Promise<ReadonlyArray<Agent>> {
    return asFallibleAsyncResponse(
    AGENTS.filter(agent => agent.name.includes(nameSubstr)));
  }
  getAgent(id: AgentId): Promise<Agent|undefined> {
    return asFallibleAsyncResponse(AGENTS.find(agent => agent.id === id));
  }
}
