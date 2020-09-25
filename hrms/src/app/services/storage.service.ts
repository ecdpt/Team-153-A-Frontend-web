import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase,  } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, DocumentData }   from "angularfire2/firestore";
import { Md5 } from 'ts-md5/dist/md5';
import { Message } from '../../models/Message';
import { from, Observable, of, Observer } from 'rxjs';
import * as firebase from 'firebase/app';
import { Present } from '../../models/Present';
import { Store} from '@ngxs/store';
import { FirebaseDatabase } from 'angularfire2';
import { GeoFirestore } from 'geofirestore';
import { firestore } from 'firebase/app';
import { resolve } from 'url';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  clientID;

 // const  geofirestore: GeoFirestore 

  constructor(private store: Store, private afAuth: AngularFireAuth, 
    private afData: AngularFireDatabase, private afStorage: AngularFireStorage, 
    private afirestore: AngularFirestore) {
    this.store.select(state => state.auth).subscribe((state)=>{
      if(!!state){
        this.clientID = state.auth.clientID;
      }
    })
  }

    convertToArray(querySnapshot){
    let presents: any[] = [];
    querySnapshot.docs.forEach(doc =>{
      console.log(doc.data())
        presents.push(doc.data());
    });
    return presents
  }


  byStaffMessage(staff_id: string, values: any, startDate: number, 
    endDate:number, group: boolean): Promise<Message[]>{
    let id = group?'groupAuthorKey' : 'authorKey'
      return firebase.firestore().collection("clients").doc(this.clientID)
        .collection("tempo").where(id, "==", staff_id)
        .where("date", ">", startDate).get().then(querySnapshot => {
        
        let messages: Message[] = this.convertToArray(querySnapshot);
        if (values.endDate !== null) {
          console.log(endDate);
          messages = messages.filter(message => message.date <= endDate);
        }
        return messages
      })
  }

  byStaffSingleMessage(staff_id: string, startDate: number, group: boolean): Promise<Message[]>{
    let id = group?'groupAuthorKey' : 'authorKey'
      return firebase.firestore().collection("clients").doc(this.clientID)
        .collection("tempo").where(id, "==", staff_id)
        .where("dateS", "==", startDate).get().then(querySnapshot => {
        
        let messages: Message[] = this.convertToArray(querySnapshot);
        
        return messages
      })
  }

  dayAllMessages(startDate: number): Promise<Message[]>{
    return firebase.firestore().collection("clients").doc(this.clientID)
      .collection("tempo").where("dateS", "==", startDate)
      .get().then(querySnapshot => {
    
        let messages: Message[] = this.convertToArray(querySnapshot);
        return messages
      })
  }

  dateRangeMessage(startDate: number, endDate:number): Promise<Message[]>{
    return firebase.firestore().collection("clients").doc(this.clientID)
      .collection("tempo").where("date", ">=", startDate)
      .where("date", "<=", endDate).get().then(querySnapshot => {
    
        let messages: Message[] = this.convertToArray(querySnapshot);
        return messages
      })
  }

  byStaff(staff: any, startDate: any, values: any, endDate: any, location: any): Promise<Present[]> {
      return firebase.firestore().collection("clients").doc(this.clientID)
        .collection("presents").where("uid", "==", staff)
        .where("rt", ">", startDate).get().then(querySnapshot => {
          let presents: Present[] = this.convertToArray(querySnapshot);
          if (values.endDate !== null) {
            console.log(endDate);
            presents = presents.filter(present => present.rt <= endDate);
          }

          if (values.location !== 'All') {
            presents = presents.filter(present => present.locId === location);
          }
          console.log(presents);
          return presents;
        });    
  }

  bySingleDay(startDate: any, values: any, location: any, staff: any ) {
    let startDateString = new Date(startDate).toDateString();
      return firebase.firestore().collection("clients").doc("MZpeZCn").collection("presents")
        .where("date", "==", startDateString).get().then(querySnapshot => {
          let presents: Present[] = this.convertToArray(querySnapshot);
          if (values.location !== 'All') {
            presents = presents.filter(present => present.locId === location);
          }
          if (values.staff !== 'All') {
            presents = presents.filter(present => present.uid === staff);
          }
          console.log(presents);
          return presents;
    });
  }

  byLocation(location: any, startDate: any, values: any, staff: any, endDate: any) {
      return firebase.firestore().collection("clients").doc(this.clientID)
      .collection("presents").where("locId", "==", location)
      .where("rt", ">", startDate).get().then(querySnapshot => {
        let presents: Present[] = this.convertToArray(querySnapshot);
        if (values.staff !== 'All') {
          presents = presents.filter(present => present.uid === staff);
        }
        if (values.endDate !== null) {
          let endDateString = new Date(endDate).toDateString();
          console.log(endDateString);
          presents = presents.filter(present => present.date === endDateString);
        }
        console.log(presents);
        return presents;
    });
  }

  dateRange(startDate: any, endDate: any, values: any, staff: any, location: any) {
    console.log(this.clientID)
      return firebase.firestore().collection("clients").doc(this.clientID)
      .collection("presents").where("rt", ">=", startDate)
      .where("rt", "<=", endDate).get().then(querySnapshot => {
      
        let presents: Present[] = this.convertToArray(querySnapshot);
        if (values.staff !== 'All') {
          presents = presents.filter(present => present.uid === staff);
        }
        if (!!values.location && values.location !== 'All') {
          presents = presents.filter(present => present.locId === location);
        }
        console.log(presents);
        return presents;
    });
  }
}
