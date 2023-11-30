import Header from "./components/Header";
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
            <Header username={mockUsername}>
              <HomePage />
            </Header>
          }
        />
        <Route
          path="/sale"
          element={
            <Header username={mockUsername}>
              <h1>empty</h1>
            </Header>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
