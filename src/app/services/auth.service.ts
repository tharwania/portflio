// Create Firebase authentication service to handle user authentication
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        public afAuth: AngularFireAuth,
        public router: Router
    ) { }

    AuthState(): Observable<firebase.User | null>{
        return this.afAuth.authState;
    }
    // Firebase SignInWithPopup
    OAuthProvider(provider: any) {
        return this.afAuth.signInWithPopup(provider)
            .then((res: any) => {
                this.router.navigate(['dashboard']);
            }).catch((error: any) => {
                window.alert(error);
            });
    }

    // Firebase Google Sign-in
    SigninWithGoogle() {
        return this.OAuthProvider(new GoogleAuthProvider())
            .then((res: any) => {
                console.log('Successfully logged in!')
            }).catch((error: any) => {
                console.log(error)
            });
    }

    // Firebase Logout 
    SignOut() {
        return this.afAuth.signOut().then(() => {
            this.router.navigate(['sign-in']);
        })
    }
}