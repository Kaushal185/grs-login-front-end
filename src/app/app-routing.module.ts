import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MessageComponent } from './message/message.component';
import { PageComponent } from './page/page.component';
import { BypageComponent } from './bypage/bypage.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: 'home/:username',
    component: HomeComponent
  },
  {
    path: 'home/:username/:id/message',
    component: MessageComponent, // Replace 'MessageComponent' with your actual component
  },
  {path:'bypage',component:BypageComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }, // Wildcard route for "Page Not Found"
];
// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   {
//     path: 'home/:username',
//     component: HomeComponent,
//     children: [
//       { path: ':id/message', component: MessageComponent, pathMatch: 'full' }, // Make :id parameter optional
//     ],
//   },
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: '**', component: NotFoundComponent },
// ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
