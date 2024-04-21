// GoogleAuthComponent.js
import React from "react";
import { Container, Typography } from "@material-ui/core";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

function GoogleAuthComponent({ onLogin }) {
  const { isSignedIn } = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
      onLogin();
    },
    flow: "auth-code"
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Google Authentication
      </Typography>
      {isSignedIn ? (
        <Typography variant="body1" align="center" gutterBottom>
          Successfully authenticated with Google.
        </Typography>
      ) : (
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            onLogin();
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
    </Container>
  );
}

export default GoogleAuthComponent;
