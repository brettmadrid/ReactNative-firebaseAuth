import React, { useState } from 'react'
import firebase from 'firebase'
import { Text, StyleSheet } from 'react-native'
import { Button, Card, CardSection, Input, Spinner } from './common'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const onButtonPress = () => {
    setErrMsg('')
    setLoading(true)

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      onLoginSuccess(user)
    })
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        onLoginSuccess(user)
      })
      .catch((error) => {
        onLoginFail(error)
      })
    })
  }

  const onLoginSuccess = (user) => {
    setUser(user)
    setEmail('')
    setPassword('')
    setLoading(false)
    setErrMsg('')
    console.log('Signed In')
  }

  const onLoginFail = (error) => {
    console.log('errorCode: ', error.code)
    console.log('errorMessage: ', error.message)
    setErrMsg('Authentication Failed!')
    setLoading(false)
  }

  const renderButton = () => {
    if (loading) {
      return <Spinner size="small"/>
    }

    return (
      <Button onPress={onButtonPress}>Log In</Button>
    )
  }

    return (
      <Card>
        <CardSection>
          <Input 
            label="email"
            placeholder="user@gmail.com"
            value={email}
            style={{height: 20, width: 100}}
            onChangeText={email => setEmail(email)}
          />
        </CardSection>
        <CardSection>
          <Input 
            label="password"
            placeholder="password"
            value={password}
            style={{height: 20, width: 100}}
            onChangeText={password => setPassword(password)}
            secureTextEntry
          />
        </CardSection>

        <Text style={styles.errTextStyle}>{errMsg}</Text>

        {renderButton()}
      </Card>
    )
}

const styles = StyleSheet.create({
  errTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
})

export default LoginForm
