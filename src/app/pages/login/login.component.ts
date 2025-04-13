import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Javítva a styleUrl hibát
})
export class LoginComponent implements OnDestroy {
  email = new FormControl('');
  password = new FormControl('');
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;
  loadingSubscription?: Subscription;


  // Tesztfelhasználó adatai
  private testUser = {
    email: 'test@gmail.com',
    password: 'testpw'
  };

  constructor(private loadingService: FakeLoadingService, private router: Router) {}

  // PROMISE login
  login() {
    this.loginError = '';

    if (this.email.value === 'test@gmail.com' && this.password.value === 'testpw') {
      this.isLoading = true;
      this.showLoginForm = false;

      localStorage.setItem('isLoggedIn', 'true');

      this.loadingService.loadingWithPromise().then((data: number) => {
        if (data === 3) {
          this.router.navigate(['/home']); // Javítva a window.location.href
        }
      }).catch((error: any) => {
        console.error(error);
        this.isLoading = false;
        this.showLoginForm = true;
        this.loginError = 'Loading error occurred!';
      }).finally(() => {
        console.log("This executed finally!");
      });
    } else {
      this.loginError = 'Invalid email or password!';
    }
  }

  // OBSERVABLE login
  loginWithObservable() {
    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';
    this.loadingSubscription = this.loadingService.loadingWithObservable2(emailValue, passwordValue).subscribe({
      next: (data: boolean) => {
        if (data) {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/home']);
        }
      },
      error: (error: any) => {
        console.error(error);
        this.isLoading = false;
        this.showLoginForm = true;
        this.loginError = 'Invalid email or password!';
      }
    });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe(); // Javítva az unsubscribe hívás
  }
}