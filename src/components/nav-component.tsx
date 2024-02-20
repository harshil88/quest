import CategoryPage from "@/pages/CategoryPage";
import QuestPage from "@/pages/QuestPage";
import ResultPage from "@/pages/ResultPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function NavComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategoryPage />} />\
        <Route path="/category" element={<QuestPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default NavComponent;
