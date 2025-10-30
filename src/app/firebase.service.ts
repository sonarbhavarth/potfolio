import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db: any;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
    }
    this.db = firebase.firestore();
  }

  async getPortfolioData(): Promise<any> {
    try {
      const doc = await this.db.collection('portfolio').doc('data').get();
      if (doc.exists) {
        return doc.data();
      }
      return null;
    } catch (error) {
      console.error('Error getting data:', error);
      return null;
    }
  }

  async savePortfolioData(data: any): Promise<boolean> {
    try {
      console.log('Attempting to save to Firebase...');
      await this.db.collection('portfolio').doc('data').set(data);
      console.log('Successfully saved to Firebase');
      return true;
    } catch (error: any) {
      console.error('Firebase save error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      return false;
    }
  }
}
