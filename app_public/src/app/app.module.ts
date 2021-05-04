import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { HomeListComponent } from "./components/home-list/home-list.component";
import { DistancePipe } from "./pipes/distance.pipe";
import { FrameworkComponent } from "./components/framework/framework.component";
import { AboutComponent } from "./components/about/about.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { PageHeaderComponent } from "./components/page-header/page-header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HtmlLineBreaksPipe } from "./pipes/html-line-breaks.pipe";
import { RatingStarsComponent } from "./components/rating-stars/rating-stars.component";
import { LocationDetailsComponent } from "./components/location-details/location-details.component";
import { DetailsPageComponent } from "./components/details-page/details-page.component";
import { AppRoutingModule } from "./app-routing.module";
import { MostRecentOrderPipe } from "./pipes/most-recent-order.pipe";

@NgModule({
  declarations: [
    HomeListComponent,
    DistancePipe,
    FrameworkComponent,
    AboutComponent,
    HomepageComponent,
    PageHeaderComponent,
    SidebarComponent,
    HtmlLineBreaksPipe,
    RatingStarsComponent,
    LocationDetailsComponent,
    DetailsPageComponent,
    MostRecentOrderPipe,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [FrameworkComponent],
})
export class AppModule {}
