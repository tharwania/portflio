import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './src/app/components/page/page.component';
import { HomeComponent } from './src/app/components/home/home.component';

const routes: Routes = [
  { path: 'page/:id', component: PageComponent },
  { path: 'home',  component: HomeComponent  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
