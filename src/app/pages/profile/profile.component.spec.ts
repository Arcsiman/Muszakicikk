import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { UserService } from '../../shared/services/user.service.service';
import { of } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider'; 

// Mock UserService
const mockUserService = {
  getUserProfile: () => of({
    user: {
      id: '1',
      email: 'test@test.com',
      firstname: 'Teszt',
      lastname: 'Felhasználó',
      cartitem: []
    },
    cart: [],
    cartStats: { totalItems: 0, totalQuantity: 0 }
  })
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});