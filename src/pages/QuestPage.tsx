import { Result } from "@/data/questions";
import { QuestRes } from "@/data/questions";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
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

  return QuestionCarouselComponent(question?.results);
}

interface Answer {
  questionNo: number;
  correctAnswer: string;
  selectedAnswer: string;
  correct: boolean;
}

function QuestionCarouselComponent(results?: Result[]) {
  const [answer, setAnswer] = useState<Answer[]>();

  function handleSubmit(selectedAnswer: string) {
    if (answer == null) {
      const firstAnswer: Answer = {
        questionNo: 0,
        correctAnswer:
          results && results[0].correct_answer ? results[0].correct_answer : "",
        selectedAnswer: selectedAnswer,
        correct:
          results && results[0].correct_answer
            ? results[0].correct_answer == selectedAnswer
            : false,
      };
      setAnswer([firstAnswer]);
    } else {
      const newAnswer: Answer = {
        questionNo: answer.length + 1,
        correctAnswer: "",
        selectedAnswer: selectedAnswer,
        correct:
          results && results[answer.length + 1].correct_answer
            ? results[answer.length + 1].correct_answer == selectedAnswer
            : false,
      };
      setAnswer([...answer, newAnswer]);
    }
  }

  return (
    <div className="px-4">
      <h1 className="text-4xl text-center my-6 font-extrabold tracking-tight">
        Category Name
      </h1>
      <h4>Current Question 2 / 10</h4>

      <Progress value={80} className="my-5" />

      <QuestionItem
        result={results && results[answer?.length ?? 0]}
        key={answer?.length ?? 0}
        options={
          results && results[answer?.length ?? 0].incorrect_answers
            ? results[answer?.length ?? 0].incorrect_answers!.options(
                results[answer?.length ?? 0].correct_answer ?? ""
              )
            : []
        }
        handleSubmit={(selectedAnswer) => {
          handleSubmit(selectedAnswer);
        }}
      />
    </div>
  );
}

interface QuestionItemProps {
  result?: Result;
  key: number;
  options: string[];
  handleSubmit: (answer: string) => void;
}

function QuestionItem(question: QuestionItemProps) {
  const [optionId, setOptionId] = useState<number | null>(null);

  function handleSubmit() {
    if (optionId != null) {
      question.handleSubmit(question.options[optionId]);
    }
  }

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
          <Button
            className="absolute top-5 right-0"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuestPage;
