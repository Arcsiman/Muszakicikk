import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, query, where, orderBy, limit, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specification.component.html',
  styleUrl: './specification.component.scss'
})
export class SpecificationComponent implements OnInit {
  private firestore = inject(Firestore);

  result1: any[] = [];
  result2: any[] = [];
  result3: any[] = [];
  result4: any[] = [];

  async ngOnInit() {
    // 1. Keresztnév "sziaa" ÉS cartitem tartalmaz legalább egy adott productId-t, vezetéknév szerint rendezve
    const q1 = query(
      collection(this.firestore, 'Users'),
      where('firstname', '==', 'sziaa'),
      where('cartitem', 'array-contains', 'lgz4UEG7jE1pfYp27um7'), // példa productId
      orderBy('lastname', 'asc')
    );
    this.result1 = (await getDocs(q1)).docs.map(doc => doc.data());

    // 2. Gmail-es email ÉS van legalább egy cartitem, max 5 találat
    const q2 = query(
      collection(this.firestore, 'Users'),
      where('email', '>=', 'a@gmail.com'), // csak prefix keresés lehetséges
      where('cartitem', 'array-contains', 'lgz4UEG7jE1pfYp27um7'), // példa productId
      limit(5)
    );
    this.result2 = (await getDocs(q2)).docs.map(doc => doc.data());

    // 3. Van legalább egy cartitem, vezetéknév szerint rendezve, max 10 találat
    const q3 = query(
      collection(this.firestore, 'Users'),
      where('cartitem', 'array-contains', 'lgz4UEG7jE1pfYp27um7'), // példa productId
      orderBy('lastname', 'asc'),
      limit(10)
    );
    this.result3 = (await getDocs(q3)).docs.map(doc => doc.data());

    // 4. cartitem tartalmaz adott productId-t, keresztnév "sziaa" ÉS email "qqq@gmail.com"
    const q4 = query(
      collection(this.firestore, 'Users'),
      where('cartitem', 'array-contains', 'lgz4UEG7jE1pfYp27um7'), // példa productId
      where('firstname', '==', 'sziaa'),
      where('email', '==', 'qqq@gmail.com')
    );
    this.result4 = (await getDocs(q4)).docs.map(doc => doc.data());
  }
}