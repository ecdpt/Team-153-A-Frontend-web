import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { UsersmainComponent }     from './usersmain/usersmain.component'


const routes: Routes = [
  {  path: '',   component: UsersmainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
