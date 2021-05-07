import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { AboutComponent } from "./components/about/about.component";
import { DetailsPageComponent } from "./components/details-page/details-page.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "about", component: AboutComponent },
  { path: "locations/:locationId", component: DetailsPageComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "profiles/:userId", component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
