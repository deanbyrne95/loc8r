import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from "../classes/location";
import { Review } from "../classes/review";

@Injectable({
  providedIn: "root",
})
export class Loc8rDataService {
  private baseApiUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) {}

  public getLocations(lat: number, lng: number): Promise<Location[]> {
    const maxDistance: number = 2000000;
    const url: string = `${this.baseApiUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Location[])
      .catch(this.handleError);
  }

  public getLocationById(locationId: string): Promise<Location> {
    const url: string = `${this.baseApiUrl}/locations/${locationId}`;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Location)
      .catch(this.handleError);
  }

  public addReviewByLocationId(
    locationId: string,
    formData: Review
  ): Promise<Review> {
    const url: string = `${this.baseApiUrl}/locations/${locationId}/reviews`;
    return this.http
      .post(url, formData)
      .toPromise()
      .then((response) => response as Review)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Something has gone wrong: ", error);
    return Promise.reject(error.message || error);
  }
}
