import { Result } from "@/data/questions";
import { QuestRes } from "@/data/questions";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function QuestPage() {
  const [question, setQuestion] = useState<QuestRes>();

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10&category=10&type=multiple")
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {});
  }, []);

  if (question?.results != null) {
    return QuestionCarouselComponent(question?.results);
  } else {
    return <></>;
  }
}

function QuestionCarouselComponent(results: Result[]) {
  return (
    <div className="px-4">
      <h1 className="text-4xl text-center my-6 font-extrabold tracking-tight">
        Category Name
      </h1>

      <h4>Current Question 2 / 10</h4>

      <Progress value={80} className="my-5" />

      <QuestionItem
        result={results[0]}
        key={0}
        options={results[0].incorrect_answers.options(
          results[0].correct_answer
        )}
      />
    </div>
  );
}

interface QuestionItemProps {
  result: Result;
  key: number;
  options: string[];
}

function QuestionItem(question: QuestionItemProps) {
  const [optionId, setOptionId] = useState<number | null>(null);

  return (
    <Card className="flex items-between justify-center p-20 h-full w-full">
      <CardContent className="w-full text-center">
        <h3 className="text-2xl font-semibold">{question.result?.question}</h3>
        <div className="flex flex-col mt-6">
          {question.options.map((option, index) => (
            <Button
              className="mt-4"
              variant={optionId === index ? "default" : "outline"}
              onClick={() => setOptionId(index)}
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Button className="absolute top-5 right-0">Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuestPage;
