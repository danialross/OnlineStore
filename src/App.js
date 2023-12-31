import Panel from "./components/Panel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ItemPage from "./pages/ItemPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Panel>
              <HomePage />
            </Panel>
          }
        />
        <Route
          path="/for-him"
          element={
            <Panel>
              <CategoryPage key={"him"} filterBy={"him"} />
            </Panel>
          }
        />
        <Route
          path="/for-her"
          element={
            <Panel>
              <CategoryPage key={"her"} filterBy={"her"} />
            </Panel>
          }
        />
        <Route
          path="/items/:id"
          element={
            <Panel>
              <ItemPage />
            </Panel>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
