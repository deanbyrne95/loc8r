import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from "../classes/location";
import { Review } from "../classes/review";
import { environment } from "../../environments/environment";
import { User } from "../classes/user";
import { AuthResponse } from "../classes/authresponse";
import { BROWSER_STORAGE } from "../classes/storage";

@Injectable({
  providedIn: "root",
})
export class Loc8rDataService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

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
    const httpOptions = this.getHttpHeaders();
    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then((response) => response as Review)
      .catch(this.handleError);
  }

  public updateReviewById(
    locationId: string,
    formData: Review
  ): Promise<Review> {
    const url = `${this.baseApiUrl}/locations/${locationId}/reviews/${formData._id}`;
    const httpOptions = this.getHttpHeaders();
    return this.http
      .put(url, formData, httpOptions)
      .toPromise()
      .then((response) => response as Review)
      .catch(this.handleError);
  }

  public deleteReviewById(
    locationId: string,
    reviewId: string
  ): Promise<Review> {
    const url: string = `${this.baseApiUrl}/locations/${locationId}/reviews/${reviewId}`;
    const httpOptions = this.getHttpHeaders();
    return this.http
      .delete(url, httpOptions)
      .toPromise()
      .then((response) => response as Review)
      .catch(this.handleError);
  }

  /**
   * AUTHENTICATION
   */
  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("login", user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("register", user);
  }

  public refreshUser(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall(`profiles/${user._id}/edit`, user);
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
   * USERS
   */
  public getUserById(userId: string): Promise<User> {
    const url = `${this.baseApiUrl}/profiles/${userId}`;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as User)
      .catch(this.handleError);
  }

  public updateUserById(formData: User): Promise<User> {
    const url = `${this.baseApiUrl}/profiles/${formData._id}`;
    const httpOptions = this.getHttpHeaders();
    return this.http
      .put(url, formData, httpOptions)
      .toPromise()
      .then((response) => response as User)
      .catch(this.handleError);
  }

  public deleteUserById(user: User): Promise<User> {
    const url = `${this.baseApiUrl}/profiles/${user._id}`;
    const httpOptions = this.getHttpHeaders();
    return this.http
      .delete(url, httpOptions)
      .toPromise()
      .then((response) => response as User)
      .catch(this.handleError);
  }

  /**
   * ERROR HANDLING
   */

  private handleError(error: any): Promise<any> {
    console.error("Something has gone wrong: ", error);
    return Promise.reject(error.message || error);
  }

  /**
   * HTTP HEADERS
   */
  private getHttpHeaders(): { headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem("loc8r-token")}`,
      }),
    };
    return httpOptions;
  }
}
