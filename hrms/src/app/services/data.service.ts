import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Site } from '../../models/Site';
import { Present } from '../../models/Present';
import { Authservice } from './authservice.service';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { Message } from '../../models/Message';
import { tickStep } from 'd3';
import { PrefixNot } from '@angular/compiler';
import { Presents } from '../dashboard/presents.actions';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   //messages
   users: User[]
   sites: Site[]
   groupUsers: User[]
   presents: Present[]
   i = 0;
   today
   range

  constructor(private store: Store, private authservice: Authservice) {
    this.today = moment(moment().format('MMMM Do YYYY, h:mm:ss a')).valueOf()
    this.range = moment(moment().subtract(7, 'days')).startOf('day').toDate().getTime()
    console.log(this.today)
    console.log(moment("07/03/2020 8:00", "M/D/YYYY H:mm").valueOf())
  }

  populateUsers(users: User[], groupUsers:User[], presents:Present[]){
    this.users = users;
    this.groupUsers = groupUsers;
    console.log(presents)
    const dateOfContentsToDelete = moment(moment().subtract(7, 'days')).toDate().getTime();
    const dateOfMessagesToDelete = moment(moment().subtract(2, 'days')).startOf('day').toDate().getTime()
    const todayPresents = presents.filter(present => present.date === new Date().toDateString());
    console.log(new Date().toDateString())
    console.log(todayPresents)
    if(presents.length > 0){
      this.authservice.deleteOverDuePresents(dateOfContentsToDelete);
    }

    if(todayPresents.length === 0){
      this.generatePresents(users);
    }

    this.authservice.deleteOverDueMessages(dateOfMessagesToDelete);

    this.authservice.getTodayMessages(new Date().toDateString()).then(dataSnapshot =>{
      let messages = dataSnapshot.docs.map(doc => doc.data())
      console.log(messages)
      if(messages.length === 0){
        //this.sendMessages();
      }
    })

   

  }

 /* dates = [
    moment("07/03/2020 8:00", "M/D/YYYY H:mm").valueOf(),
    moment("07/02/2020 8:00", "M/D/YYYY H:mm").valueOf(),
    moment("07/01/2020 8:00", "M/D/YYYY H:mm").valueOf(),
    moment("06/30/2020 8:00", "M/D/YYYY H:mm").valueOf(),
    moment("06/29/2020 8:00", "M/D/YYYY H:mm").valueOf()
    ]

    dates_late = [
      moment("07/03/2020 9:00", "M/D/YYYY H:mm").valueOf(),
      moment("07/02/2020 9:00", "M/D/YYYY H:mm").valueOf(),
      moment("07/01/2020 9:00", "M/D/YYYY H:mm").valueOf(),
      moment("06/30/2020 9:00", "M/D/YYYY H:mm").valueOf(),
      moment("06/29/2020 9:00", "M/D/YYYY H:mm").valueOf()
    ]
    

    date_close = [
      moment("07/03/2020 17:00", "M/D/YYYY H:mm").valueOf(),
      moment("07/02/2020 17:00", "M/D/YYYY H:mm").valueOf(),
      moment("07/01/2020 17:00", "M/D/YYYY H:mm").valueOf(),
      moment("06/30/2020 17:00", "M/D/YYYY H:mm").valueOf(),
      moment("06/29/2020 17:00", "M/D/YYYY H:mm").valueOf()
    ]*/



  generatePresents(users: User[]){
    console.log(0)
    if(this.i > 1){
      return;
    }
    let send = [];
    let rt = 0;
    let ct = 0;
    let psId = "";
    let date = ""
    let uid = "";
    let ert = 0;
    let enoh = 0;
    let gp = 0;
    let locId = ""
    let time = true;
    let location = true;
    let internet = true
    let cLocId = ""
    let cisTime = true;
    let cisLocation = true;
    let cisInternet = true;
    let cid = "";
    let lat = 0;
    let lon = 0;
    let rad = 0;
    this.i++;
  
//    for(let i= 0; i < this.dates.length; i++){
      for(let user of users){
        let rand1 = Math.random(); // use for present
        let rand2 = Math.random(); // use for puntual
        let psId = this.authservice.getPsID();
        console.log(rand1)
        console.log(rand2)
        uid = user.uid;
        enoh = user.enoh;
        ert = user.ert;
        gp = user.gp;
        locId = user.siteId;
        cLocId = user.siteId;
        ct = new Date().setHours(17); //this.date_close[0];
        cid = user.cid;
        date  = new Date(new Date()).toDateString()
        if(rand1 < 0.2){
          console.log("I am here")
        }else if (rand2 < 0.4){
          console.log("rand2 < 0.3")
          rt = new Date().setHours(9); //this.dates_late[i]
          const present = new Present(uid, cid, enoh, ert, gp, psId, date, locId, rt, time, 
            location, internet,
            cLocId, ct, cisTime, cisLocation, cisInternet, lat, lon, rad );
            this.authservice.register(present).subscribe(res=>{
              console.log(res)
            });
        }else{
          console.log("rand2 > 0.5")
          rt = new Date().setHours(8);
          const present = new Present(uid, cid, enoh, ert, gp, psId, date, locId, rt, time, 
            location, internet,
            cLocId, ct, cisTime, cisLocation, cisInternet, lat, lon, rad );
            this.authservice.register(present).subscribe(res=>{
              console.log(res)
            });                       
        }
      }
   // }
  }

 

// messages
/*message_dates = [
  moment("07/03/2020"),
  moment("07/02/2020"),
  moment("07/01/2020"),
  moment("06/30/2020"),
  moment("06/29/2020"),
  moment("06/28/2020"),
  moment("06/27/2020"),
  moment("06/26/2020"),
  moment("06/25/2020"),
  moment("06/24/2020"),
  moment("06/23/2020"),
  moment("06/22/2020"),
  moment("06/21/2020"),
  moment("06/20/2020"),
  moment("06/19/2020"),
 
  ]*/

  messages = [
    "Going to England", 
    "I am in Ghana on important mission", 
    "I seal the deal yesterday",
    "Who are you going with",
    "Okay, let me do it together",
    "When are we going for the constract"
  ]

  subjects = [
    "Ghana mission",
    "Contract",
    "Where"
  ]

  sendMessages(){
    let messageId = "";
    let groupAuthorKey = "";
    let groupAuthorName = "";
    let authorKey = "";
    let authorName = "";
    let authorFcm = "";
    let clientId = "MZpeZCn";
    let message= "";
    let date = 0;
    let read = "false";
    let subject = "";
    let topic = "";
    let groupReceiverKey = "";
    let groupReceiverName = "";
    let receiverKey = "";
    let receiverName = "";
    let receiverFcm = "";

  //  for(let dateMom of this.message_dates){
      for(let user of this.users){
        for(let group of user.groups){
          groupAuthorKey = group;
          console.log(this.users)
          console.log(user.groups)
          groupAuthorName = this.groupUsers.filter(user => user.uid === group)[0].name;
          authorKey = user.uid;
          authorName = user.name;
          console.log(groupAuthorName)
         // for(let receiver of this.users){
          //  console.log(receiver.uid)
         //   console.log(user.uid)
         //   if(receiver.uid !== user.uid){
          //    for(let group of receiver.groups){
                let message_rand = Math.round(Math.random() * 5)
                let subject_rand = Math.round(Math.random() * 2)
                console.log(group)
                groupReceiverKey = group;
                groupReceiverName = this.groupUsers.filter(user => user.uid === group)[0].name;
                receiverKey = user.uid;
                receiverName = user.name;
                date = new Date().getTime(); //dateMom.toDate().getTime();
                subject = this.subjects[subject_rand] // % this.subjects.length]
                message = this.messages[message_rand] // % this.messages.length]
                messageId = this.authservice.getMessageID()
               // topic = receiver.name
                let newMessage = new Message(messageId);
                newMessage.topic = groupReceiverName
                newMessage.message = message
                newMessage.subject = subject
                newMessage.date = date
                newMessage.receiverName = receiverName
                newMessage.receiverKey = groupReceiverKey
                newMessage.groupReceiverKey = groupReceiverKey
                newMessage.groupReceiverName = groupReceiverName
                newMessage.authorName = authorName
                newMessage.authorKey = authorKey
                newMessage.groupAuthorName = groupAuthorName
                newMessage.groupAuthorKey =groupAuthorKey
                newMessage.receiverFcm = ""
                newMessage.authorFcm = ""
                newMessage.clientId ="MZpeZCn"
                newMessage.dateS = new Date(new Date()).toDateString(); //dateMom.format('ddd MMM DD YYYY');
                newMessage.read= 'false'
                console.log(newMessage)
                this.authservice.sendMessage(newMessage).subscribe(res =>{
                  console.log(res)
                })
                
            }
          }
       // }
      }
    }
