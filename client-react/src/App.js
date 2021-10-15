import { Route, Link } from "react-router-dom";
import { useState, useEffect, useContext, createContext } from "react";
import { contexto, ComponenteContexto } from "./Contexto";

function App() {
  return (
    <>
      <ComponenteContexto>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </ComponenteContexto>
    </>
  );
}

const Home = (props) => {
  const globalObject = useContext(contexto);
  const {token } = globalObject;
  const [usuarios, setUsuarios] = useState(null)
  console.log(globalObject, usuarios);

  const fetchUsers = async (token) => {
    try {
      const response = await fetch("http://localhost:9000/usuarios", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      console.log(responseData)
      if (responseData) {
        setUsuarios(responseData)
      }
      
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {

    if (token) {
      await fetchUsers(token);
    }
      
  }, [token]);
  return (
    <>
      <div>Lista de usuarios</div>

      <Link to="/login">ir a login</Link>
      {usuarios && usuarios.map((u, i) => <div key={i}>{u.correo}</div>)}
    </>
  );
};

const Login = (props) => {
  const [data, setData] = useState(null);
  const global = useContext(contexto);
  useEffect(async () => {
    if (data) {
      console.log(data);
      try {
        const response = await fetch("http://localhost:9000/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();

        console.log("data del servidor", responseData);
        const { token } = responseData;
        if (token) {
          console.log(token);
          global.setGlobal({ ...global, token });
          props.history.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);

    setData({
      correo: e.target.correo.value,
      clave: e.target.clave.value,
    });
  };

  const handleLogout = () => {
    delete global.token;
    global.setGlobal(global);

  }

  return (
    <>
    {!global.token ? (
      <>

      <h2>LOGIN</h2>
      <form name="formulario" onSubmit={handleSubmit}>
        <input type="text" name="correo" />
        <input type="password" name="clave" />
        <button type="submit">Login</button>
      </form>
      <Link to="/">ir a home</Link>

      </>
    ): <button onClick={handleLogout}>LOGOUT</button>}
      
    </>
  );
};

export default App;
