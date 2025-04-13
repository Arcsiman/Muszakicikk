import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeLoadingService {
  loadingWithPromise(): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(3), 1000);
    });
  }

  loadingWithPromise2(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (email === 'test@gmail.com' && password === 'testpw') {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  loadingWithObservable2(email: string, password: string): Observable<boolean> {
    return new Observable((subscriber: Subscriber<boolean>) => {
      if (email === 'test@gmail.com' && password === 'testpw') {
        subscriber.next(true);
        subscriber.complete();
      } else {
        subscriber.error(false);
      }
    });
  }
}