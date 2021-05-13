

import config from '../config';
import  apiV1  from './config';

const updateUser =  async ({ accessToken, data}) => {
  console.log("update user", data);
  const url = `/users/update`;
    try {
    let responseJson =  apiV1.putJson(url, accessToken, data);
    return responseJson;
  } catch(err) {
    console.log(err);
  }
}

export {
  updateUser,
};