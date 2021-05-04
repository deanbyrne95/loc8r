import { Inject, Injectable } from "@angular/core";
import { BROWSER_STORAGE } from "../classes/storage";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {}

  public getToken(): string {
    return this.storage.getItem("loc8r-token");
  }

  public saveToken(token: string): void {
    this.storage.setItem("loc8r-token", token);
  }
}
