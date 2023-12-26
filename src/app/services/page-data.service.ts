import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, DocumentData, doc, docData, CollectionReference } from '@angular/fire/firestore';
import { addDoc, setDoc, updateDoc } from 'firebase/firestore';
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

  public async updatePage(page: Page) {
    const ref = doc(this.firestore, 'pages', page.url);
    await updateDoc(ref, {
      name: page.name,
      content: page.content,
      url: page.url
    });
  }

  public async addPage(page: Page) {
    await setDoc(doc(this.firestore, "pages", page.url), {
      name: page.name,
      content: page.content,
      url: page.url
    });
  }
}


export interface Page {
  name: string,
  url: string,
  content: string
}
