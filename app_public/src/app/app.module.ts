import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HomeListComponent } from './components/home-list/home-list.component';
import { DistancePipe } from './pipes/distance.pipe';
import { RouterModule } from '@angular/router';
import { FrameworkComponent } from './components/framework/framework.component';

@NgModule({
  declarations: [
    HomeListComponent,
    DistancePipe,
    FrameworkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeListComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
