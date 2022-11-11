import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginUserMutation } from 'gql/graphql';
import config from 'config';
import JWTManager from 'utils/jwt';

function Login() {
  const navigate = useNavigate();
  const [fieldLogin, setFieldLogin] = useState({ username: '', password: '' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [login, _dataLogin] = useLoginUserMutation();
  const [error, setError] = useState('');
  const { username, password } = fieldLogin;

  const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) =>
    setFieldLogin((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await login({ variables: { loginInput: fieldLogin } });

    if (response.data?.login.success) {
      JWTManager.setToken(response.data.login.accessToken as string);
      navigate(config.routes.home);
    } else {
      if (response.data?.login.message) setError(response.data?.login.message);
    }
  };

  return (
    <Fragment>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" value={username} onChange={handleOnChangeInput} />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleOnChangeInput}
          pattern="[0-9A-Za-z]{8,}"
          title="Password is format not correct"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </Fragment>
  );
}

export default Login;
