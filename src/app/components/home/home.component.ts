import { Component, OnInit } from '@angular/core';
import { PageDataService } from 'src/app/services/page-data.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pages: any;
  constructor(private pageService: PageDataService, private titleService: Title) {
    this.pageService.getPages().subscribe((pages) => {
      this.pages = pages;
    });
    this.titleService.setTitle("Home");
  }

  ngOnInit(): void {
  }

}
