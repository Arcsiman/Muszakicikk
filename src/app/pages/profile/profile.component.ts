import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service.service';
import { User } from '../../shared/models/user';
import { CartItem } from '../../shared/models/cartitem';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  cart: CartItem[] = [];
  cartStats = {
    totalItems: 0,
    totalQuantity: 0
  };
  isLoading = true;

  private subscription: Subscription | null = null;
  editForm: FormGroup;
  isEditing = false;
  saveError = '';

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  startEdit() {
    if (this.user) {
      this.editForm.patchValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname
      });
      this.isEditing = true;
      this.saveError = '';
    }
  }
  cancelEdit() {
    this.isEditing = false;
    this.saveError = '';
  }

  async saveProfile() {
    if (this.editForm.invalid) {
      this.saveError = 'Minden mező kitöltése kötelező!';
      return;
    }
    try {
      await this.userService.updateUserProfile(this.editForm.value);
      this.isEditing = false;
      this.loadUserProfile(); // Frissíti a nézetet
    } catch (error) {
      this.saveError = 'Hiba a mentés során!';
      console.error(error);
    }
  }
  //constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.subscription = this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data.user;
        this.cart = data.cart;
        this.cartStats = data.cartStats;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Hiba a felhasználói profil betöltésekor:', error);
        this.isLoading = false;
      }
    });
  }

  getUserInitials(): string {
    if (!this.user) return '?';
    const firstInitial = this.user.firstname ? this.user.firstname.charAt(0).toUpperCase() : '';
    const lastInitial = this.user.lastname ? this.user.lastname.charAt(0).toUpperCase() : '';
    return firstInitial + (lastInitial ? lastInitial : '');
  }
}