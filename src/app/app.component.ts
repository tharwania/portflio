import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Observable, Subscription, map } from 'rxjs';
import { PageDataService } from './services/page-data.service';
import { AuthService } from './services/auth.service';
import { trace } from '@angular/fire/compat/performance';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly userDisposable: Subscription | undefined;
  user: firebase.User | null | undefined;
  showLoginButton = false;
  showLogoutButton = false;
  title = 'portfolio';
  pages: Observable<DocumentData[]>;
  constructor(private service: PageDataService,
    public readonly authService: AuthService) {
    this.pages = this.service.getPages();
    this.userDisposable = this.authService.AuthState().pipe(
      trace('auth'),
    ).subscribe((user: any) => {
      const isLoggedIn = !!user;
      this.user = user;
      this.showLoginButton = !isLoggedIn;
      this.showLogoutButton = isLoggedIn;
    });
  }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

}
