import { Component, OnInit } from '@angular/core';
import { PageDataService } from 'src/app/services/page-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pages: any;
  constructor(private pageService: PageDataService) {
    this.pageService.getPages().subscribe((pages) => {
      this.pages = pages;
    });
  }

  ngOnInit(): void {
  }

}
