import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Page, PageDataService } from 'src/app/services/page-data.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  page: Observable<Page> | null = null;
  constructor(private pageService: PageDataService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id) {
        this.page = pageService.getPage(id)
      }
      else {
        // somethign default
      }
    })
  }

  ngOnInit(): void {

  }

}
