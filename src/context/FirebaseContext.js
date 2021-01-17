import React, { createContext } from 'react';
import firebase from 'firebase';
import firebaseConfig from '../config/firebase';
import * as Random from 'expo-random';
import 'firebase/auth';
import 'firebase/firestore';

const FirebaseContext = createContext();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },
  createUser: async (user) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      const uid = Firebase.getCurrentUser().uid;

      let profilePhotoUrl = 'deufalt';

      await db.collection('users').doc(uid).set({
        username: user.username,
        email: user.email,
        profilePhotoUrl,
      });

      if (user.profilePhoto) {
        profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto);
      }

      delete user.password;

      return { ...user, profilePhotoUrl, uid };
    } catch (error) {
      console.log('Error creating user! ', error);
    }
  },

  createAudioRecording: async ({
    recording,
    recordingText,
    recordingFormData,
    symptomNames,
    diseasePredictions,
  }) => {
    const uri = recording.getURI();
    try {
      const userUID = Firebase.getCurrentUser().uid;
      let audioRecordingUrl = await Firebase.uploadAudio(uri);
      await db
        .collection('users')
        .doc(userUID)
        .collection('recordings')
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          audioRecordingUrl: audioRecordingUrl,
          recordingText: recordingText,
          recordingFormInput: recordingFormData,
          symptomNames: symptomNames,
          diseasePredictions: diseasePredictions,
        })
        .then((docRef) => {})
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    } catch (error) {
      console.log('Error creating audio recording! ', error);
    }
  },

  uploadAudio: async (uri) => {
    const uid = Firebase.getCurrentUser().uid;
    try {
      const audio = await Firebase.getBlob(uri);
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const fileUUID = Random.getRandomBytes(128);
      const audioRef = firebase
        .storage()
        .ref('audioRecordings')
        .child(`${fileUUID}.${fileType}`);
      await audioRef
        .put(audio, {
          contentType: `audio/${fileType}`,
        })
        .then(() => {})
        .catch((error) => console.log('Error putting audio!', error));
      const url = await audioRef.getDownloadURL();
      return url;
    } catch (error) {
      console.log('Error uploading audio! ', error);
    }
  },

  uploadProfilePhoto: async (uri) => {
    const uid = Firebase.getCurrentUser().uid;

    try {
      const photo = await Firebase.getBlob(uri);

      const imageRef = firebase.storage().ref('profilePhotos').child(uid);
      await imageRef.put(photo);
      const url = await imageRef.getDownloadURL();

      await db.collection('users').doc(uid).update({
        profilePhotoUrl: url,
      });

      return url;
    } catch {
      console.log('Error uploading profile picture!', error);
    }
  },

  getBlob: async (uri) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = () => {
        reject(new TypeError('Network request failed.'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  },

  getUserInfo: async (uid) => {
    try {
      const user = await db.collection('users').doc(uid).get();

      if (user.exists) {
        return user.data();
      }
    } catch (error) {
      console.log('Error getting user information! ', error);
    }
  },

  logOut: async () => {
    try {
      await firebase.auth().signOut();
      return true;
    } catch (error) {
      console.log('Error logging out!', error);
    }
    return false;
  },
  signIn: async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  getUserVoiceRecordings: async () => {
    const userUID = Firebase.getCurrentUser().uid;
    try {
      console.log('Getting called!', userUID);
      const recordings = await db
        .collection('users')
        .doc(userUID)
        .collection('recordings')
        .get()
        .then((querySnapshot) => {
          const recordings = [];
          querySnapshot.forEach((recording) => {
            recordings.push({ id: recording.id, data: recording.data() });
          });
          console.log(recordings);
          return recordings;
        });
    } catch (error) {
      console.log('Error getting the recordings for the user!', error);
    }
  },
};

const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { db, FirebaseContext, FirebaseProvider };
