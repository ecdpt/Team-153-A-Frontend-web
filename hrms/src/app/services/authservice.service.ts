import { Injectable } from '@angular/core';
import {Apollo, Mutation} from 'apollo-angular';
import gql from 'graphql-tag';
import { GH_USER_ID, GH_AUTH_TOKEN }         from '../constants'
/*import { Md5 } from 'ts-md5/dist/md5';
import * as moment from 'moment';*/


@Injectable({
  providedIn: 'root'
})
export class Authservice{
  private userId: string = null;
  
  document = gql`
    mutation login($loginInput: LoginInput){
      login(loginInput:$loginInput){
          created_at,
          email,
          firstName,
          id,
          initials,
          lastName,
          occupation,
          password,
          phone,
          role,
          title
      }
    }
  `;

  setUserId(id: string) {
    this.userId = id;
   // this._isAuthenticated.next(true);
  }

  deleteUserId(){
    this.userId = null;
  }
  // 7
  logout() {
  /*  localStorage.removeItem(GC_USER_ID);
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.userId = null;

    this._isAuthenticated.next(false);*/
  }

  saveUserData(id, token) {
    localStorage.setItem(GH_USER_ID, id);
    localStorage.setItem(GH_AUTH_TOKEN, token);
    this.setUserId(id);
  }

  deleteUserData() {
    localStorage.removeItem(GH_USER_ID);
    localStorage.removeItem(GH_AUTH_TOKEN);
    this.deleteUserId()
  }


  }







