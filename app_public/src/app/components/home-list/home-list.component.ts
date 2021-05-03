import { Component, OnInit } from '@angular/core';
import { Loc8rDataService } from '../../services/loc8r-data.service';

export class Location {
  _id: string;
  name: string;
  distance: number;
  address: string;
  rating: number;
  facilities: string[];
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {
  public locations: Location[];

  constructor(private loc8rDataService: Loc8rDataService) { }

  private getLocations(): void {
    this.loc8rDataService
      .getLocations()
      .then(foundLocations => this.locations = foundLocations);
  }

  ngOnInit() {
    this.getLocations();
  }

}
