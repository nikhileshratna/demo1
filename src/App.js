import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateHobbyPage from "./pages/CreateHobbyPage";
import EditHobbyPage from "./pages/EditHobbyPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addemployee" element={<CreateHobbyPage />} />
        <Route path="/editemployee" element={<EditHobbyPage />} />
      </Routes>
    </div>
  );
}

export default App;
