import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FakeApiService } from './fake-api.service';
import { ListComponent } from './list/list.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ComparisonComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule 
  ],
  providers: [ FakeApiService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
