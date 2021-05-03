import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { AboutComponent } from "./components/about/about.component";
import { DetailsPageComponent } from "./components/details-page/details-page.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "about", component: AboutComponent },
  { path: "location/:locationId", component: DetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
