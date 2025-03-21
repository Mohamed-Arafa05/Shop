import React from 'react';
import { Button } from "@material-tailwind/react";
import Shop from './Shop';
import Contact from './Contact';
import Login from './Login';
import Signin from './Signin';
import Admin from './Admin';


const App = () => {
    return (
        <div>
          <Shop/>
          <Admin/>
          <Contact/>
          <Login/>
          <Signin/>
            <h1>Hello, React!</h1>
            <div className="flex w-max gap-4">
      <Button variant="filled">filled</Button>
      <Button variant="gradient">gradient</Button>
      <Button variant="outlined">outlined</Button>
      <Button variant="text">text</Button>
    </div>
        </div>
    );
};

export default App;
