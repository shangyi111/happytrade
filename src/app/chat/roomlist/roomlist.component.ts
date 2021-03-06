import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../core/auth.service';


export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};


@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.css']
})
export class RoomlistComponent implements OnInit {

  nickname='';
  displayedColumns: string[] = ['roomname'];
  rooms = [];
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, 
  			  private router: Router, 
  			  public datepipe: DatePipe,
  			  public auth:AuthService) {

    
      if (firebase.auth().currentUser) {
      // User is signed in.
        this.nickname = this.auth.authState.displayName || this.auth.authState.email,
        firebase.database().ref('rooms/').on('value', resp => {
        this.rooms = [];
        this.rooms = snapshotToArray(resp);
        this.isLoadingResults = false;
      });
      } else {
      // No user is signed in.
      alert("Please log in");
      this.router.navigate(['/home']);
      
      
      };
    
  }

  ngOnInit(): void {
  }

  enterChatRoom(roomname: string) {
    const chat = { roomname: '', nickname: '', message: '', date: '', type: '' };
    chat.roomname = roomname;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    // chat.message = `${this.nickname} enter the room`;
    // chat.type = 'join';
    // const newMessage = firebase.database().ref(`chats/${chat.roomname}`).push();
    // newMessage.set(chat);
    let ecr = true;
    console.log(`roomname: ${roomname}`);
    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', (resp: any) => {
      if (!ecr ) return;
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const user = roomuser.find(x => x.nickname === this.nickname);
      if (user !== undefined) {
        if (user.status !== 'online') {
          const userRef = firebase.database().ref('roomusers/' + user.key);
          userRef.update({status: 'online'});
        }
      } else {
        const newroomuser = { roomname: '', nickname: '', status: '' };
        newroomuser.roomname = roomname;
        newroomuser.nickname = this.nickname;
        newroomuser.status = 'online';
        const newRoomUser = firebase.database().ref('roomusers/').push();
        newRoomUser.set(newroomuser);
      }
      ecr = false;
    });

    this.router.navigate(['/chatroom', roomname]);
  }

  logout(): void {
    localStorage.removeItem('nickname');
    this.router.navigate(['/home']);
  }


}
