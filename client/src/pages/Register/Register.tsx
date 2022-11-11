import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRegisterUserMutation } from 'gql/graphql';
import config from 'config';

function Register() {
  const navigate = useNavigate();
  const [fieldRegister, setFieldRegister] = useState({ username: '', password: '' });
  const [register, dataRegister] = useRegisterUserMutation();
  const { username, password } = fieldRegister;

  const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) =>
    setFieldRegister((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register({ variables: { registerInput: fieldRegister } });
    navigate(config.routes.home);
  };

  return (
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
      <input type="submit" value="Register" />
    </form>
  );
}

export default Register;
