import { Injectable } from '@angular/core';
import { 
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument
} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  constructor(private afs: AngularFirestore) {
  }
  
  create(Record){
    return this.afs.collection('subscribers').add(Record)
  }

}
