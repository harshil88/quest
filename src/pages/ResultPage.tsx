import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAnswers } from "@/question-store";
import { Check, Cross } from "lucide-react";

function ResultPage() {
  const { answers } = useAnswers();
  return (
    <div className="mx-5">
      <h1 className="text-4xl text-center my-6 font-extrabold tracking-tight">
        Category Name
      </h1>
      <h4>You Scored 2 / 10</h4>
      <Table className="my-10">
        <TableCaption>Your Answers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Correct Answer</TableHead>
            <TableHead>Your Answer</TableHead>
            <TableHead>Right/Wrong</TableHead>
          </TableRow>
          {answers.map((answer) => (
            <TableRow>
              <TableCell>{answer.question}</TableCell>
              <TableCell>{answer.correctAnswer}</TableCell>
              <TableCell>{answer.selectedAnswer}</TableCell>
              <TableCell>{answer.correct ? <Check /> : <Cross />} </TableCell>
            </TableRow>
          ))}
        </TableHeader>
      </Table>
    </div>
  );
}

export default ResultPage;
