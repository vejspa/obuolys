document.addEventListener("DOMContentLoaded", event => { 
    const app = firebase.app();
})
function microsoftLogin() {
    var provider = new firebase.auth.OAuthProvider('microsoft.com');
    provider.setCustomParameters({
        // Force re-consent.
        prompt: 'consent',
        // Target specific email with login hint.
        login_hint: 'vardas.pavarde@grazinosmok.lt'
    });
    provider.setCustomParameters({
        // Optional "tenant" parameter in case you are using an Azure AD tenant.
        // eg. '8eaef023-2b34-4da1-9baa-8bc8c9d6a490' or 'contoso.onmicrosoft.com'
        // or "common" for tenant-independent tokens.
        // The default value is "common".
        tenant: 'TENANT_ID'
    });
    provider.addScope('mail.read');
    provider.addScope('calendars.read');
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
    // IdP data available in result.additionalUserInfo.profile.
    // ...

    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // OAuth access and id tokens can also be retrieved:
    var accessToken = credential.accessToken;
    var idToken = credential.idToken;
    })
    .catch((error) => {
    // Handle error.
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult()
  .then((result) => {
    // IdP data available in result.additionalUserInfo.profile.
    // ...

    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // OAuth access and id tokens can also be retrieved:
    var accessToken = credential.accessToken;
    var idToken = credential.idToken;
    })
    .catch((error) => {
    // Handle error.
  });
  });
}