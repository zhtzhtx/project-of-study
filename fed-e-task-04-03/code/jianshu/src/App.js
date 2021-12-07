import React, { useState } from 'react';
import { container } from './Style';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Title from './components/Title';

function App() {
  const [type, setType] = useState(0)
  return (
    <div css={container}>
      <Title type={type} changeType={type => setType(type)} />
      {type === 0
        ? <SignIn />
        : <SignUp />}

    </div>
  );
}

export default App;
