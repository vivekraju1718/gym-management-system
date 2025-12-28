import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <main className="pt-28 min-h-screen bg-[var(--bg-main)]">
        <Outlet />
      </main>
    </>
  );
}

export default App;
