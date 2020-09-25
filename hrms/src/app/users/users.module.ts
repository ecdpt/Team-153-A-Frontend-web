import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule }   from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { UsersmenuComponent } from './usersmenu/usersmenu.component';
import { UseraddressComponent } from './useraddress/useraddress.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { UsersmainComponent } from './usersmain/usersmain.component';



@NgModule({
  declarations: [UsersComponent, UserComponent, UsersmenuComponent, UseraddressComponent, UsergroupComponent, UsersmainComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
