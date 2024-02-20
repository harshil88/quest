import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { QuestRes } from "@/data/questions";
import axios from "axios";
import { useEffect, useState } from "react";
import QuestionCardComponent from "./components/QuestionCardComponent";

function QuestPage() {
  const [question, setQuestion] = useState<QuestRes>();

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10")
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <QuestionCardComponent
            result={question?.results[0]}
            handleSelectAnswer={() => {}}
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

export default QuestPage;
