import { Inject, Injectable } from "@angular/core";
import { AuthResponse } from "../classes/authresponse";
import { BROWSER_STORAGE } from "../classes/storage";
import { User } from "../classes/user";
import { Loc8rDataService } from "./loc8r-data.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  user: User = new User();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private loc8rDataService: Loc8rDataService
  ) {}

  public getToken(): string {
    return this.storage.getItem("loc8r-token");
  }

  public saveToken(token: string): void {
    this.storage.setItem("loc8r-token", token);
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      this.user = JSON.parse(atob(token.split(".")[1]));
      return this.user;
    }
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public login(user: User): Promise<any> {
    return this.loc8rDataService
      .login(user)
      .then((authResponse: AuthResponse) => this.saveToken(authResponse.token));
  }

  public register(user: User): Promise<any> {
    return this.loc8rDataService
      .register(user)
      .then((authResponse: AuthResponse) => this.saveToken(authResponse.token));
  }

  public refreshUser(user: User): Promise<any> {
    return this.loc8rDataService
      .refreshUser(user)
      .then((authResponse: AuthResponse) => this.saveToken(authResponse.token))
      .catch((err) => {
        console.error(err);
      });
  }

  public logout(): void {
    this.storage.removeItem("loc8r-token");
  }
}
