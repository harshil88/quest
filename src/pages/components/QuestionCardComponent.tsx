import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Result } from "@/data/questions";

interface QuestionCardProps {
  result: Result;
  handleSelectAnswer: () => void;
}

function QuestionCardComponent({
  result,
  handleSelectAnswer,
}: QuestionCardProps) {
  const questions = [...result.incorrect_answers, result.correct_answer];

  <Card>
    <CardHeader>
      <CardTitle>{result.question}</CardTitle>
      <CardContent>
        {questions.map((question) => (
          <Button>{question}</Button>
        ))}
      </CardContent>
    </CardHeader>
  </Card>;
}

export default QuestionCardComponent;
