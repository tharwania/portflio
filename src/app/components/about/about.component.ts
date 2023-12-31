import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('About Avinash Tharwani');
    this.meta.addTag({ name: 'description', content: 'About Avinash Tharwani' })
  }

  ngOnInit(): void {
  }

}
