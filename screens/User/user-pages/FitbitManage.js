import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import { makeRedirectUri, ResponseType, TokenResponse, useAuthRequest } from 'expo-auth-session';
import { View, Text, Button, Platform, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';

import { fitbitConfig as config } from '../../config';
import Fitbit from '../../fitbit';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

WebBrowser.maybeCompleteAuthSession()

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
  tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
  revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
};

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: config.client_id,
      scopes: ['activity', 'heartrate', 'nutrition', 'profile'], // activity heartrate location nutrition oxygen_saturation profile respiratory_rate settings sleep social temperature weight
      redirectUri: 'exp://localhost:19000/--/*',
      responseType: ResponseType.Token,
      expires_in: 31536000,
    },
    discovery
  );
  const [token, setToken] = React.useState({});
  const [fitbit, setFitbit] = React.useState({});
  const [id, setId] = React.useState('');
  const [data, setData] = React.useState("data");

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code, state, user_id } = response.params;
      console.log(response);
      const accessToken = TokenResponse.fromQueryParams(response.params);
      setToken(accessToken);
      setId(user_id); 
    }
  }, [response]);

  React.useEffect(() => {
    if (( token !== {} && id != '' )) {
      console.log(token);
      setFitbit(new Fitbit(token, id));
    }
  }, [token, id]);

  // this is just dummy
  const leftComponent = <View style={{width:350}}>
                          <Text style={styles.heading}></Text>
                          <Text style={styles.subheading}></Text>
                        </View>

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <Header leftComponent={leftComponent} rightComponent={{}}/>
        <Button
          disabled={!request}
          title="Login"
          onPress={() => { promptAsync(); } } />
          <Button
            title="Get Data"
            onPress={ () => {
              const boo = fitbit.checkTokenFresh()
              console.log(boo);
              setData(boo.toString()) }} />
          <Button
            title="Get Profile"
            onPress={ () => {
              fitbit.getProfile() }} />
        <Text>
          Token: {token.accessToken}
        </Text>
        <Text>
          Fitbit Fresh: { data }
        </Text>
      </ScrollView>
      <StatusBar style="auto" />
    </ SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
