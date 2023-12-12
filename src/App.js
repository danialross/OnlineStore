import Panel from "./components/Panel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  const mockUsername = "kevin";
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Panel username={mockUsername}>
              <HomePage />
            </Panel>
          }
        />
        <Route
          path="/sale"
          element={
            <Panel username={mockUsername}>
              <h1>empty</h1>
            </Panel>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
