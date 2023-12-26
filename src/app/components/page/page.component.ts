import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Page, PageDataService } from 'src/app/services/page-data.service';
import { Editor, Toolbar, toHTML } from 'ngx-editor';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageComponent implements OnInit, OnDestroy {
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];
  editor: Editor = new Editor();

  subscriptions: Subscription[] = [];
  isNewPage = false;
  pageObservable: Observable<Page> | null = null;
  page: Page | null = null;
  data: string = '';
  isLoggedIn = false;
  editMode = false;
  constructor(private pageService: PageDataService,
    private route: ActivatedRoute,
    public readonly authService: AuthService,
    private router: Router) {
    let paramMapSubscription = this.route.paramMap.subscribe(paramMap => {
      let authSubscription = authService.AuthState().subscribe(user => {
        this.isLoggedIn = !!user;
      })
      this.subscriptions?.push(authSubscription);
      const id = paramMap.get('id');
      if (!id) return;
      if (id === 'new') {
        this.isNewPage = true;
        this.editMode = true;
        this.page = {
          name: '',
          url: '',
          content: ''
        }
      }
      else {
        this.pageObservable = this.pageService.getPage(id)
        let pageSubscription = this.pageObservable.subscribe(page => {
          this.page = page;
        });
        this.subscriptions?.push(pageSubscription);
      }
    })
    this.subscriptions?.push(paramMapSubscription);
  }
  ngOnDestroy(): void {
    this.subscriptions?.forEach(sub => sub.unsubscribe());
  }

  async addOrUpdatePage() {
    if (!this.page) return;
    if (this.page.url === '') {
      this.page.url = this.page.name.toLowerCase().replace(/ /g, '-');
    }
    if (this.isNewPage) {
      await this.pageService.addPage(this.page);
      this.router.navigateByUrl('/page/' + this.page.url);
    }
    else {
      await this.pageService.updatePage(this.page);
    }
    this.editMode = false;
  }

  ngOnInit(): void {
  }

}
