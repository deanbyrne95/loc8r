import { Component, Input, OnInit } from "@angular/core";
import { Location } from "../home-list/home-list.component";

@Component({
  selector: "app-location-details",
  templateUrl: "./location-details.component.html",
  styleUrls: ["./location-details.component.css"],
})
export class LocationDetailsComponent implements OnInit {
  @Input() location: Location;

  public apiKey: string = "AIzaSyCAmPHGlJBD4Jg510N89xcEFe5OnFiWIFo";

  public isFormVisible = false;
  public newReview = {
    author: "",
    rating: 5,
    reviewText: "",
  };

  constructor() {}

  ngOnInit() {}
}
