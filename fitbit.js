import { TokenResponse } from 'expo-auth-session';

export default class Fitbit {
  constructor(token, id) {
    this.token = token;
    this.accessToken = token.accessToken;
    this.id = id;
    console.log("Initiated fitbit device:", id);
  }

  checkTokenFresh() { // return True if the token need to be refreshed
    console.log('checkToken: ', this.token);
    const boo = TokenResponse.isTokenFresh(this.token);
    console.log("status: ", boo);
    return boo
  }

  getProfile() {
    this.request('profile')
  }

  getActivity() {
    this.request('activities')
  }

  request(category, date = '') {
    base = 'https://api.fitbit.com/1/user/-/'
    if (!date) {
      date = '/date/' + date
    }
    fetch(base + category + date + '.json', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${this.accessToken}`
      },
    })
      .then(res => res.json())
      .then(res => {
      console.log(`Profile: ${JSON.stringify(res)}`);
    })
    .catch(err => {
      console.error('Error: ', err);
    })
  }

}