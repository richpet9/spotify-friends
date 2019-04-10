const express = require('express');
const request = require('request');
const querystring = require('querystring');
const { client } = require('./spotify');

const app = express();

const PORT = 8080;

//Spotify API info
const clientId = client.clientId;
const clientSecret = client.clientSecret;
const redirectURI = client.redirectURI;

app.use(express.static('client/public'));

app.get('/login', (req, res) => {
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: 'user-read-private',
        redirect_uri: redirectURI
      })
  );
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;

  //Successful login and accept
  if (code) {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirectURI,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization: 'Basic ' + new Buffer(clientId + ':' + clientSecret).toString('base64')
      },
      json: true
    };

    //Make POST request for access token and refresh token
    request.post(authOptions, (err, response, body) => {
      if (err) {
        //No good connection
        res.redirect('/#error=' + encodeURIComponent(err));
      } else {
        if (body.error) {
          //No good response
          res.redirect('/#error=' + encodeURIComponent(body.error));
        } else {
          //Good response from spotify
          const accessToken = body.access_token;
          const refreshToken = body.refresh_token;
          res.redirect(
            '/#' +
              querystring.stringify({
                access_token: accessToken,
                refresh_token: refreshToken
              })
          );
        }
      }
    });
  } else {
    //No good log in
    res.redirect('/#error=login_error');
  }
});

app.get('/refresh-token', (req, res) => {
  // This code is directly ripped from spotify
  // requesting access token from refresh token
  var refreshToken = req.query.token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { Authorization: 'Basic ' + new Buffer(clientId + ':' + clientSecret).toString('base64') },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const accessToken = body.access_token;
      res.redirect(
        '/#' +
          querystring.stringify({
            access_token: accessToken
          })
      );
    }
  });
});

app.listen(PORT, () => {
  console.log(`[server] listening on port ${PORT}`);
});
