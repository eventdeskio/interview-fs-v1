import { useActionState } from "react";
import { Button, Card, Input } from "react-daisyui";

const login = async (credentials: any) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

const action = async (_, formData: any) => {
  try {
    const jwtToken = await login({
      username: formData.get("username"),
      password: formData.get("password"),
    });

    return {
      message: "Successfully Logged In :)",
      payload: jwtToken,
    };
  } catch {
    return { message: "Not able to login :(", payload: null };
  }
};

export default function Login() {
  const [actionState, formAction, isPending] = useActionState(action, null);

  return (
    <Card>
      <Card.Body>
        <Card.Title tag="h2">Login</Card.Title>
        <form action={formAction}>
          <div className="flex flex-col w-full component-preview p-4  gap-2 font-sans">
              <label>Username</label>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col w-full component-preview p-4 gap-2 font-sans">
            <label>Password</label>
            <Input
              type="text"
              name="password"
              placeholder="Password"
              disabled={isPending}
            />
          </div>

          <Card.Actions className="justify-end">
            <Button type="submit" color="primary" disabled={isPending} >
              {isPending ? "Submitting..." : "Login"}
            </Button>
          </Card.Actions>
          <div className="todo-details">
            <h4>{actionState?.message}</h4>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}
