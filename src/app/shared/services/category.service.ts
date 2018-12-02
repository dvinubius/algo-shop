import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afDb: AngularFireDatabase) { }

  get allCategories$(): Observable<{name: string}[]> {
    return this.afDb.list('/categories').valueChanges() as Observable<{name: string}[]>;
  }
}
