import React, { useContext} from "react";
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Context from '../../context';
import { ME_QUERY } from '../../graphql/queries';
import { BASE_URL } from "../../client";

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context)

  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      })
      const { me } = await client.request(ME_QUERY)
      console.log({ me })
      dispatch({ type: "LOGIN_USER", payload: me });
      dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() })
    } catch (err) {
      onFailure(err)
    }
  };

  const onFailure = err => {
    console.err("Error logging in", err)
  }

  return (
    <div className={classes.root}>
      <Typography 
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: "#00e676"}}
      >
        Welcome to CrimeShip
      </Typography>
      <GoogleLogin 
        clientId="827258769707-jlad19iut5g4rsk0pgk8t39l56jrs40n.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        buttonText="Login with Google"
        theme="dark"
      />
    </div>
  )
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    background: "black",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
