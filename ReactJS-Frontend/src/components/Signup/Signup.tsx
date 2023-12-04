import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <Link to="/">Back</Link>
      </header>
      <main>
        <h2>Sign up with email</h2>
        <p>
          Get chatting with friends and family today by signing up for our chat
          app
        </p>
        <Link to="/signin">Google SSO</Link>
        <p>OR</p>
        <form>
          <>
            <p>Your name</p>
            <input type="text" />
          </>
          <>
            <p>Your email</p>
            <input type="email" />
          </>
          <>
            <p>Password</p>
            <input type="password" />
          </>
          <>
            <p>Confirm Password</p>
            <input type="password" />
          </>
        </form>
      </main>
      <footer>
        <button>Create an account</button>
      </footer>
    </>
  );
}

export default App;
