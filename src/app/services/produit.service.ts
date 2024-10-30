import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Produit {
  id?: string;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  constructor(private firestore: Firestore) {}

  async addProduit(produit: Produit) {
    const produitRef = collection(this.firestore, 'produits');
    return await addDoc(produitRef, produit);
  }
}
