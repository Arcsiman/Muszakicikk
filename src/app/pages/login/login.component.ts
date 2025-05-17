import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';



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
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;
  loginState: 'form' | 'loading' | 'error' = 'form';
  loadingSubscription?: Subscription;

  private testUser = {
    email: 'test@gmail.com',
    password: 'testpw'
  };

  //constructor(private loadingService: FakeLoadingService, private router: Router) {}
  constructor(
    private authService: AuthService,
    private router: Router
  ){}


  login() {
    if(this.email.invalid){
      this.loginError = 'Invalid email format!';
      return;
    }
    if(this.password.invalid){
      this.loginError = 'Invalid password format!';
      return;
    }
    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.isLoading = true;
    this.showLoginForm = false;
    this.loginError = '';
    
    this.authService.signIn(emailValue, passwordValue).then((userCredential) => {
      console.log('Login successful:', userCredential.user);
      this.authService.updateLoginStatus(true);
      this.router.navigateByUrl('/home');
    })
    .catch((error) => {
      console.error('Login failed:', error);
      this.isLoading = false;
      this.showLoginForm = true;
     
      switch(error.code){
        case 'auth/user-not-found':
          this.loginError = 'User not found!';
          break;
        case 'auth/wrong-password':
          this.loginError = 'Wrong password!';
          break;
        case 'auth/invalid-credential':
          this.loginError = 'Invalid email or password!';
          break;
        default:
          this.loginError = 'Authentication failed!';
      }
    });
  }

  /*loginWithObservable() {
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
  }*/

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
}
