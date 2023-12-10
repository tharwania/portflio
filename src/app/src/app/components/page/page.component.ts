import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Page, PageDataService } from 'src/app/services/page-data.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isNewPage = false;
  pageObservable: Observable<Page> | null = null;
  page: Page | null = null;
  data: string = '';
  isLoggedIn = false;
  editMode = false;
  public Editor = ClassicEditor;
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
    // this.router.navigate(['../home'], { relativeTo: this.route });
    if (!this.page) return;
    if (this.page.url === '') {
      this.page.url = this.page.name.toLowerCase().replace(/ /g, '-');
    }
    if (this.isNewPage) {
      debugger;
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
