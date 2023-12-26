import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MessageComponent } from './message/message.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: 'home/:username',
    component: HomeComponent,
  },
  {
    path: 'home/:id/message',
    component: MessageComponent, // Replace 'MessageComponent' with your actual component
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }, // Wildcard route for "Page Not Found"
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
