import Keycloak from "keycloak-js";

const _kc = new Keycloak('/keycloak.json');

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  _kc.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  })
    .then((authenticated) => {
      if (!authenticated) {
        console.log("user is not authenticated..!");
      }
      // console.log(_kc.token);
      onAuthenticatedCallback();
    })
    .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(err=>console.log(err));

const getUsername = () => _kc.tokenParsed?.preferred_username;

const getFullName = () => _kc.tokenParsed?.name;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const getProfile = () => _kc.hasRealmRole("student") ? "student" : _kc.hasRealmRole("lecturer")? "lecturer" : "";

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getFullName,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  getProfile
};

export default UserService;
