import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '../components/home-list/home-list.component';

@Injectable({
  providedIn: 'root'
})
export class Loc8rDataService {

  private baseApiUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  public async getLocations(): Promise<Location[]> {
    const lng: number = -0.7992599;
    const lat: number = 51.378091;
    const maxDistance: number = 20;
    const url: string = `${this.baseApiUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    try {
      const response = await this.http
        .get(url)
        .toPromise();
      return response as Location[];
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong: ', error);
    return Promise.reject(error.message || error);
  }
}
