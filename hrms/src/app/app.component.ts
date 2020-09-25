import { Component } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { GH_AUTH_TOKEN } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hrms';
  rates: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    console.log(process.env.NODE_ENV)
    const token = localStorage.getItem(GH_AUTH_TOKEN);
    console.log(token)
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
        console.log(result.data)
       /* this.rates = result.data.getUsers;
        this.loading = result.loading;
        this.error = result.error;*/
      });
  }
}
