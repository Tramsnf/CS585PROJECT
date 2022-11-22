import UserService from "./UserService";

import fetchIntercept from "fetch-intercept";


const configure = () => {


fetchIntercept.register({
  request: function(url, config) {
    // Modify the url or config here
      if(!config){
          return [url, config]
      }
      const cb = () => {
        config.headers.Authorization = `Bearer ${UserService.getToken()}`;
        return [url, config]
      };

      return UserService.updateToken(cb);
  },

  requestError: function(error) {
    // Called when an error occured during another 'request' interceptor call
    return Promise.reject(error);
  },

  response: function(response) {
    // Modify the reponse object
    return response;
  },

  responseError: function(error) {
    // Handle an fetch error
    return Promise.reject(error);
  }
});

};

const HttpService = {
  configure,
};

export default HttpService;
