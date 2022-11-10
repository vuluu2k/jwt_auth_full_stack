import React, { useState } from 'react';

type Props = {};

function Register() {
  const [fieldRegister, setFieldRegister] = useState({ username: '', password: '' });

  const { username, password } = fieldRegister;

  const handleOnChangeInput = (event: any) =>
    setFieldRegister((prev) => ({ ...prev, [event.target.name]: [event.target.value] }));

  return (
    <form action="">
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
