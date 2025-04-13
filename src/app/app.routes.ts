import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // Statikus elérési útvonalak
    { path: 'home', component: HomeComponent },
    // Lazy loading a Tasks komponens
    
    { path: 'login', component: LoginComponent },

    { path: 'signup', component: SignupComponent }, // Signup útvonal hozzáadása

    { path: 'profile', component: ProfileComponent },

   
    { path: '**', component: PageNotFoundComponent },

];