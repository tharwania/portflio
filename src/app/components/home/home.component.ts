import { Component, OnInit } from '@angular/core';
import { PageDataService } from 'src/app/services/page-data.service';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pages: any;
  constructor(private pageService: PageDataService,
    private titleService: Title, private metaService: Meta) {
    this.pageService.getPages().subscribe((pages) => {
      this.pages = pages;
    });
    this.titleService.setTitle("Avinash Tharwani's Blog Home");
    this.metaService.updateTag({ name: 'description', content: "Page links about Avi's Blog where you can read what I am learning and writing about." });

  }

  ngOnInit(): void {
  }

}
