import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, DocumentData, doc, docData, CollectionReference } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageDataService {
  pages: CollectionReference<DocumentData>;
  constructor(private firestore: Firestore) {
    this.pages = collection(this.firestore, 'pages');
  }

  public getPages() {
    return collectionData(this.pages);
  }

  public addPage(page: Page) {
    addDoc(this.pages, page)
  }
}


export interface Page {
  name: string,
  url: string,
  content: string
}
