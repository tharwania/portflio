import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './src/app/components/page/page.component';

const routes: Routes = [
  { path: 'page/:id', component: PageComponent },
  { path: '', redirectTo: '/page/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
