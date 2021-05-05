import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { AboutComponent } from "./components/about/about.component";
import { DetailsPageComponent } from "./components/details-page/details-page.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "about", component: AboutComponent },
  { path: "location/:locationId", component: DetailsPageComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
