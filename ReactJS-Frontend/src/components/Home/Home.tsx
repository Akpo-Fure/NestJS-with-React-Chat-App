import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <header>Chat App</header>
      <main>
        <h1>Connect friends easily and quickly</h1>
        <p>
          Our chat app is the perfect way to stay connected with friends and
          family{" "}
        </p>
        <>
          <Link to={"/"}>Google SSO</Link>
          <p>OR</p>
          <Link to={"/signup"}>Sign up with email</Link>
        </>
      </main>
      <footer>
        <Link to={"/signin"}>Sign in with email</Link>
      </footer>
    </div>
  );
}

export default App;
