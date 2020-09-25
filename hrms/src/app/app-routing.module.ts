import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { HomeComponent }          from './home/home.component';
import { LoginComponent }         from './login/login.component';
import { LogoutComponent }        from './logout/logout.component';
import { NotfoundComponent }      from './notfound/notfound.component';
import { AuthGuard }              from './auth.guard';


const routes: Routes = [
  {  path: 'home',    component: HomeComponent, canActivate: [AuthGuard], },
  {  path: 'login',   component: LoginComponent },
  {  path: 'logout',  component: LogoutComponent},
  {  path: '',   redirectTo: '/home', pathMatch: 'full' },
  {  path: '**',   component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
