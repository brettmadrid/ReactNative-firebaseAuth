import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import firebase from 'firebase'
import { Header, Button, Spinner } from './components/common'
import LoginForm from './components/LoginForm';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null)

  useEffect(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyAwzQyXNRh2mn25ehL8JdPMS7onxJDWLCQ",
      authDomain: "fir-authentication-fcd7c.firebaseapp.com",
      databaseURL: "https://fir-authentication-fcd7c.firebaseio.com",
      projectId: "fir-authentication-fcd7c",
      storageBucket: "fir-authentication-fcd7c.appspot.com",
      messagingSenderId: "808297370057",
      appId: "1:808297370057:web:afea77e4f2a1f4f5f85818",
      measurementId: "G-BVHMTS9JSY"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })

  }, []);

  const renderContent = () => {
    switch (loggedIn) {
      case true:
        return (
          <Button 
            onPress={() => firebase.auth().signOut()}
          >Log Out</Button>
        )
      case false:
        return <LoginForm />
      default:
        return <Spinner size="large" />
    }
  }

  return (
    <View>
      <Header headerText="Authentication" />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({

})

