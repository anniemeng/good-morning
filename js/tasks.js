var clientId = '443558602010-8mmqpojbqlj6bc60af9mq3n2ilsj7l1t.apps.googleusercontent.com';
var apiKey = 'AIzaSyBaAXNCfhGjkv1QSJIl9veY2-l8WN2uPaA';
var scopes = 'https://www.googleapis.com/auth/tasks';

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth, 300000);
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('google');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}

function makeApiCall() {
  gapi.client.load('task', 'v1', function() {
    // Step 5: Assemble the API request
    var request = gapi.client.task.lists.get({
      'userId': 'me'
    });
    // Step 6: Execute the API request
    request.execute(function(resp) {

    });
  });
}
