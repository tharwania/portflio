import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, DocumentData, doc, docData, CollectionReference, orderBy, query, getDocs } from '@angular/fire/firestore';
import { Query, addDoc, limit, setDoc, updateDoc, where } from 'firebase/firestore';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PageDataService {
  pagesByDate: Query<DocumentData>;
  pageRef: CollectionReference<DocumentData>
  constructor(private firestore: Firestore) {
    this.pageRef = collection(this.firestore, 'pages');
    this.pagesByDate = query(this.pageRef, orderBy("dateUpdated", "desc"));
  }

  public getPages() {
    return collectionData(this.pagesByDate).pipe(map((pages: any) => {
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
    const queryByUrl = query(this.pageRef, where("url", "==", pageId), limit(1));
    return collectionData(queryByUrl).pipe(
      map((docData: DocumentData) => {
        const firstDoc = docData[0];
        return {
          name: firstDoc['name'],
          url: firstDoc['url'],
          content: firstDoc['content'],
          metaDescription: firstDoc['metaDescription'],
          dateUpdated: firstDoc['dateUpdated'].toDate()
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
