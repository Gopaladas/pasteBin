import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewPaste from "./pages/ViewPastes";
import PasteBin from "./pages/pasteBin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PasteBin />} />
        <Route path="/p/:id" element={<ViewPaste />} />
        <Route
          path="*"
          element={<h2 style={{ textAlign: "center" }}>404 Page Not Found</h2>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
