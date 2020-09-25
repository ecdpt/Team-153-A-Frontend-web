import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Authservice }   from '../services/authservice.service';
import { Router } from '@angular/router';
import { SIGNOUT_USER_MUTATION } from '../graphql';
import gql from 'graphql-tag';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
              private apollo: Apollo, private authService: Authservice, 
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.authService.deleteUserData();
    console.log("Yes")
    this.apollo.mutate({
      mutation: SIGNOUT_USER_MUTATION
    }).subscribe((result) => {
      console.log(result)
    });
    this.router.navigate(['home']);
  }


}
