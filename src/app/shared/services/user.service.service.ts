import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { CartItem } from '../models/cartitem';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: User | null,
    cart: CartItem[],
    cartStats: {
      totalItems: number,
      totalQuantity: number
    }
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            cart: [],
            cartStats: { totalItems: 0, totalQuantity: 0 }
          });
        }

        return from(this.fetchUser(authUser.uid));
      })
    );
  }

  private async fetchUser(userId: string): Promise<{
    user: User | null,
    cart: CartItem[],
    cartStats: {
      totalItems: number,
      totalQuantity: number
    }
  }> {
    try {
      // Felhasználó adatainak lekérése
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        return {
          user: null,
          cart: [],
          cartStats: { totalItems: 0, totalQuantity: 0 }
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };
      const cart: CartItem[] = user.cartitem ?? [];

      // Kosár statisztika
      const totalItems = cart.length;
      const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

      return {
        user,
        cart,
        cartStats: {
          totalItems,
          totalQuantity
        }
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null,
        cart: [],
        cartStats: { totalItems: 0, totalQuantity: 0 }
      };
    }
  }
}