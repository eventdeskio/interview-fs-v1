import { useState } from "react";
import { Button, Card, Input } from "react-daisyui";

type credentials = {
  userName: string;
  password: string;
};

const LoginPage = () => {
  const onLogin = () => {
    fetch('http://localhost:5000/api/login', [])
  };

  const {credentials, setCredentials} = useState();

  const onChangeUserName = (value: any)=>{
    setCredentials({
      ...credentials,
      userName: value
    })
  }

  const onChangePassword = (value: any)=>{
    setCredentials({
      ...credentials,
      password: value
    })
  }

  return (
    <div className="">
      <Card>
        <Card.Body>
          <Card.Title tag="h2">Login</Card.Title>
          <p>Please provide your credentials</p>
          <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
            <Input value={credentials.username} onChange={onChangeUserName}/>
          </div>
          <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
            <Input  value={credentials.password} onChange={onChangePassword}/>
          </div>
          <Card.Actions className="justify-end">
            <Button color="primary" onClick={onLogin}>
              Login
            </Button>
          </Card.Actions>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
