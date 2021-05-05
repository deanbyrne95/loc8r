import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Location } from "../classes/location";
import { Review } from "../classes/review";
import { environment } from "../../environments/environment";
import { User } from "../classes/user";
import { AuthResponse } from "../classes/authresponse";

@Injectable({
  providedIn: "root",
})
export class Loc8rDataService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  /**
   * LOCATIONS
   */

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

  /**
   * REVIEWS
   */

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

  /**
   * USERS
   */
  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("login", user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("register", user);
  }

  public makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url = `${this.baseApiUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then((response) => response as AuthResponse)
      .catch(this.handleError);
  }

  /**
   * ERROR HANDLING
   */

  private handleError(error: any): Promise<any> {
    console.error("Something has gone wrong: ", error);
    return Promise.reject(error.message || error);
  }
}
