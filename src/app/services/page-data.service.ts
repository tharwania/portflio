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
    return collectionData(this.pages).pipe(map((pages: any) => {
      return pages.map((page: any) => {
        return {
          name: page.name,
          url: page.url,
          content: page.content,
          metaDescription: page.metaDescription,
          dateUpdated: page.dateUpdated.toDate()
        } as Page;
      });
    }));
  }

  public getPage(pageId: string): Observable<Page> {
    const ref = doc(this.firestore, `pages/${pageId}`);
    return docData(ref).pipe(
      map((docData: DocumentData) => {
        return {
          name: docData['name'],
          url: docData['url'],
          content: docData['content'],
          metaDescription: docData['metaDescription'],
          dateUpdated: docData['dateUpdated'].toDate()
        } as Page;
      }
      ));
  }

  public async updatePage(page: Page) {
    const ref = doc(this.firestore, 'pages', page.url);
    await updateDoc(ref, {
      name: page.name,
      content: page.content,
      url: page.url,
      metaDescription: page.metaDescription,
      dateUpdated: new Date()
    });
  }

  public async addPage(page: Page) {
    await setDoc(doc(this.firestore, "pages", page.url), {
      name: page.name,
      content: page.content,
      url: page.url,
      metaDescription: page.metaDescription,
      dateUpdated: new Date()
    });
  }
}


export interface Page {
  name: string,
  url: string,
  content: string,
  metaDescription?: string,
  dateUpdated?: Date,
}
