import { Result } from "@/data/questions";
import { QuestRes } from "@/data/questions";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAnswers } from "@/question-store";
import { useNavigate } from "react-router-dom";

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

function QuestionCarouselComponent(results?: Result[]) {
  const { answers, submitAnswer, selectedCategory } = useAnswers();
  const [questionNo, setQuestionNo] = useState<number>(0);
  const navigate = useNavigate();

  console.log(selectedCategory.toString());

  function handleSubmit(selected: string) {
    const correct = (results && results[questionNo].correct_answer) ?? "";
    const question = (results && results[questionNo].question) ?? "";

    submitAnswer(selected, correct, question);
    setQuestionNo(questionNo + 1);
    if (questionNo == 2) {
      navigate("/result");
    }
  }

  return (
    <div className="px-4">
      <h1 className="text-4xl text-center my-6 font-extrabold tracking-tight">
        Category Name
      </h1>
      <h4>Current Question {questionNo} / 10</h4>

      <Progress value={80} className="my-5" />

      <QuestionItem
        result={results && results[questionNo]}
        options={
          results && results[questionNo].incorrect_answers
            ? results[questionNo].incorrect_answers!.options(
                results[questionNo].correct_answer ?? ""
              )
            : []
        }
        handleSubmit={(selected) => {
          handleSubmit(selected);
        }}
      />
    </div>
  );
}

interface QuestionItemProps {
  result?: Result;
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
