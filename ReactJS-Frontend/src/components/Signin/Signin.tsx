import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <Link to="/">Back</Link>
      </header>
      <main>
        <h2>Log in to chat app</h2>
        <p>Welcome back! Sign in using your social account or google SSO</p>
        <Link to="/signin">Google SSO</Link>
        <p>OR</p>
        <form>
          <>
            <p>Email</p>
            <input type="email" />
          </>
          <>
            <p>Password</p>
            <input type="password" />
          </>
        </form>
      </main>
      <footer>
        <button>Log in</button>
        <Link to="/forgotpassword">Forgot password?</Link>
      </footer>
    </>
  );
}

export default App;
