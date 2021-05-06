import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  public pageContent = {
    header: {
      title: "Profile",
      strapline: "This is you!",
    },
    sidebar: "Be who you are!"
  };

  constructor() {}

  ngOnInit() {}
}
