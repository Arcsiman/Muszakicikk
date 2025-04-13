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
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  email = new FormControl('');
  password = new FormControl('');
  loginError: string = '';
  loginState: 'form' | 'loading' | 'error' = 'form';
  loadingSubscription?: Subscription;

  private testUser = {
    email: 'test@gmail.com',
    password: 'testpw'
  };

  constructor(private loadingService: FakeLoadingService, private router: Router) {}

  login() {
    this.loginError = '';

    if (this.email.value === this.testUser.email && this.password.value === this.testUser.password) {
      this.loginState = 'loading';
      localStorage.setItem('isLoggedIn', 'true');

      this.loadingService.loadingWithPromise().then((data: number) => {
        if (data === 3) {
          this.router.navigate(['/home']);
        }
      }).catch((error: any) => {
        console.error(error);
        this.loginError = 'Loading error occurred!';
        this.loginState = 'error';
      }).finally(() => {
        console.log("This executed finally!");
      });
    } else {
      this.loginError = 'Invalid email or password!';
      this.loginState = 'error';
    }
  }

  loginWithObservable() {
    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';
    this.loginState = 'loading';

    this.loadingSubscription = this.loadingService.loadingWithObservable2(emailValue, passwordValue).subscribe({
      next: (data: boolean) => {
        if (data) {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/home']);
        }
      },
      error: (error: any) => {
        console.error(error);
        this.loginError = 'Invalid email or password!';
        this.loginState = 'error';
      }
    });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
}
