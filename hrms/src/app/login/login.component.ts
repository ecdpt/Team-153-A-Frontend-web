import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authservice }   from '../services/authservice.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { GH_USER_ID, GH_AUTH_TOKEN }         from '../constants'

import {
  CREATE_USER_MUTATION,
  //CreateUserMutationResponse,
  SIGNIN_USER_MUTATION,
 // SigninUserMutationResponse
} from '../graphql';

const document = gql`
    mutation{
      login(loginInput:{
        email: "c@yahoo.com",
        password:"welcome"}) {
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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show
  target
 // show$: Observable<AuthStateModel>;
  hide = false;
  onLine = false;
  message: string;
  loginForm = this.fb.group({
    id: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: Authservice, 
    private apollo: Apollo,
    private snackbar: MatSnackBar, /*private store: Store, private storage:LocalStorageService*/) {
  /*  let connectedRef = afData.database.ref(".info/connected");
    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        this.onLine = true;
      } else {
        this.onLine = false;
      }
    });
    this.show$ = this.store.select(state => state.auth);*/
  
  }

  ngOnInit(){
  //  this.confirm();
  /*  this.apollo.mutate({
      mutation: gql`
      mutation{
        login(loginInput:{
          email: "c@yahoo.com",
          password:"welcome"}) {
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
    `
    }).subscribe(result => {
      console.log(result);
      this.apollo
      .watchQuery({
        query: gql`
          {
            getUsers{
              firstName
              lastName
            }
          }
        `,
      })
      .valueChanges.subscribe((result:any) => {
        console.log(result)
      });
  
    },
      (error) => {
        console.log(error.message)
      });
    this.onlineLogin() */
  }
   

  onSubmit() {
    console.warn(this.loginForm.value);
    const email: string = this.loginForm.value.email.trim();
    const password: string = this.loginForm.value.password.trim();
    const clientID: string = this.loginForm.value.id.trim();
    console.log(email)
    console.log(password)
    console.log(clientID)
    this.confirm(email, password, clientID)
   // if(this.onLine){
     // this.onlineLogin(1 email, password)
  /*  }else{
      console.log("local called")
      this.localLogin(id, email, password)
    }  */
  }

/*  setMessage(message) {
    this.snackbar.open(message, this.target, {
      duration: 3000
    });
  }*/

/*  localLogin(id, email, password){
    let authObj = JSON.parse(this.storage.retrieve(email));
    console.log(authObj)
    if(!!authObj){
      let user = JSON.parse(authObj.user)
      let hash = Md5.hashStr(password)
      if(id === authObj.id && hash === authObj.pass){
        this.store.dispatch(new Auth.LocalLogin(user, id)).subscribe(()=>{
          this.router.navigate(['console/dashboard']);
        })
      }else{
        this.onlineLogin(id, email, password)
        console.log("online called1")
      } 
    }else{
      console.log("online2 called")
      this.onlineLogin(id, email, password)
    } 
  }

  onlineLogin() {
    this.authService
      .mutate({
        mutation: this.authService.document,
        variables: {
          loginInput: {
            email: "c@yahoo.com",
            password:"welcome"}
        }
      })
      .subscribe(result => {
        console.log(result);
        //this.router.navigate(['console/dashboard']);
      },
        (error) => {
          console.log(error.message)
        })
  }
*/
 

  confirm(email, password, clientID) {
    this.apollo.mutate({
      mutation: SIGNIN_USER_MUTATION,
      variables: {
        email: email,
        password: password,
        clientID: clientID
      }
    }).subscribe((result) => {
      const user: any = result.data
      const id = user.login.id;
      const token = user.login.token
    //  const token = result.data.signinUser.token;
      this.authService.saveUserData(id, token);
      this.router.navigate(['home'])
    });

     // this.router.navigate(['/']);*/
    /*  } else {
        this.apollo.mutate({
          mutation: CREATE_USER_MUTATION,
          variables: {
            name: this.name,
            email: this.email,
            password: this.password
          }
        }).subscribe((result) => {
          const id = result.data.signinUser.user.id;
          const token = result.data.signinUser.token;
          this.saveUserData(id, token);
  
          this.router.navigate(['/']);
  
        }, (error) => {
          alert(error)
        })*/
  }
}


