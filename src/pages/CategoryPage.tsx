import { useEffect, useState } from "react";
import GridComponent from "./components/GridComponent";
import axios from "axios";
import { QuestionCategoryList } from "@/data/question-category";
import { useNavigate } from "react-router-dom";

function CategoryPage() {
  const [categories, setCategories] = useState<QuestionCategoryList>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCategory() {
    navigate("/category");
  }

  return (
    <div className="mx-80">
      <h1 className="text-4xl font-extrabold tracking-tight">Quest</h1>
      <div className="grid grid-cols-3 ">
        {categories?.trivia_categories.map((cat) => (
          <GridComponent
            name={cat.name}
            handleCategory={() => handleCategory()}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
