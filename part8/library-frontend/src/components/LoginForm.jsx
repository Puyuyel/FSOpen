import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CURRENT_USER, LOGIN } from "../queries";

const LoginForm = ({ setToken, show, setPage, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userResult = useQuery(CURRENT_USER);

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      setPage("authors");
    },
  });

  useEffect(() => {
    if (!userResult.loading && userResult.data) {
      setUser(userResult.data.me);
    }
  }, [userResult.data]); // eslint-disable-line

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("libraryapp-user-token", token);
    }
  }, [result.data]); // eslint-disable-line

  if (!show) return null;

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
