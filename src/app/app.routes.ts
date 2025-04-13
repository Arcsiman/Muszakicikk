import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    
    { path: 'home', component: HomeComponent },
    
    
    { path: 'login', component: LoginComponent },

    { path: 'signup', component: SignupComponent }, 

    { path: 'profile', component: ProfileComponent },
    { path: 'products', component: ProductsComponent },
   
    { path: '**', component: PageNotFoundComponent },

];