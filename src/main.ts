import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "muszakicikk-2b9f5", appId: "1:1054217470753:web:f31868c9fd3cc992803460", storageBucket: "muszakicikk-2b9f5.firebasestorage.app", apiKey: "AIzaSyDI4ugV6utia0lPzm93GAQWZv5qgwsyLM8", authDomain: "muszakicikk-2b9f5.firebaseapp.com", messagingSenderId: "1054217470753" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "muszakicikk-2b9f5", appId: "1:1054217470753:web:f31868c9fd3cc992803460", storageBucket: "muszakicikk-2b9f5.firebasestorage.app", apiKey: "AIzaSyDI4ugV6utia0lPzm93GAQWZv5qgwsyLM8", authDomain: "muszakicikk-2b9f5.firebaseapp.com", messagingSenderId: "1054217470753" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
}).catch(err => console.error(err));