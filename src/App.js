// App.js
import React, { useState } from "react";
import GoogleAuthComponent from "./component/GoogleAuthComponent";
import TodoApp from "./component/TodoApp";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  return (
    <>
      {authenticated ? (
        <TodoApp />
      ) : (
        <GoogleAuthComponent onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
