import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Page, PageDataService } from 'src/app/services/page-data.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  page: Observable<Page> | null = null;
  data: string = '';
  isLoggedIn = false;
  editMode = false;
  public Editor = ClassicEditor;
  constructor(private pageService: PageDataService,
    private route: ActivatedRoute,
    public readonly authService: AuthService) {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id) {
        this.page = this.pageService.getPage(id)
      }
      authService.AuthState().subscribe(user => {
        this.isLoggedIn = !!user;
      })
    })
  }
  public onChange({ editor }: ChangeEvent) {
    this.data = editor.data.get();
  }

  addOrUpdatePage() {
    if (this.page) {
      this.page.subscribe(page => {
        page.content = this.data;
        this.pageService.updateDoc(page);
        this.editMode = false;
      })
    }
  }

  ngOnInit(): void {

  }

}
