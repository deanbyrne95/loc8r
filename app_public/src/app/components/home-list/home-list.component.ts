import { Component, OnInit } from "@angular/core";
import { Location } from "src/app/classes/location";
import { GeolocationService } from "src/app/services/geolocation.service";
import { Loc8rDataService } from "../../services/loc8r-data.service";

@Component({
  selector: "app-home-list",
  templateUrl: "./home-list.component.html",
  styleUrls: ["./home-list.component.css"],
})
export class HomeListComponent implements OnInit {
  public locations: Location[];
  public message: string;

  constructor(
    private loc8rDataService: Loc8rDataService,
    private geolocationService: GeolocationService
  ) {}

  private getPosition(): void {
    this.message = "Getting your location...";
    this.geolocationService.getPosition(
      this.getLocations.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this)
    );
  }

  private getLocations(position: any): void {
    this.message = "Searching for nearby places...";
    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude;
    this.loc8rDataService.getLocations(lat, lng).then((foundLocations) => {
      this.message = foundLocations.length > 0 ? "" : "No locations found";
      this.locations = foundLocations;
    });
  }

  private showError(error: any): void {
    this.message = error.message;
  }

  private noGeo(): void {
    this.message = "Geolocation not supported by this browser.";
  }

  ngOnInit() {
    this.getPosition();
  }
}
