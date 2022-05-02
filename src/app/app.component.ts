import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { PageDataService } from './services/page-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  pages: Observable<DocumentData[]>;
  constructor(private service: PageDataService) {
    this.pages = this.service.getPages();
  }
  ngOnInit(): void {

  }


}
