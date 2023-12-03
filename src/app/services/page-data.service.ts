import { DocTypeToken } from '@angular/compiler/src/ml_parser/tokens';
import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, DocumentData, doc, docData, CollectionReference } from '@angular/fire/firestore';
import { addDoc, DocumentReference, setDoc } from 'firebase/firestore';
import { map, Observable } from 'rxjs';

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

  public getPage(pageId: string): Observable<Page> {
    const ref = doc(this.firestore, `pages/${pageId}`);
    return docData(ref).pipe(
      map((docData: DocumentData) => docData as Page)
    );
  }

  public updateDoc(page: Page) {
    const ref = doc(this.firestore, `pages/${page.url}`);
    setDoc(ref, page)
  }
}


export interface Page {
  name: string,
  url: string,
  content: string
}
