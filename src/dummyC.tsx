import { Button } from "./components/ui/button";
import { useAnswers } from "./question-store";

function FunctionalAnswerUpdater() {
  const { answers, submitAnswer } = useAnswers();

  function handleClick() {
    submitAnswer("right", "right");
  }

  return (
    <div>
      <div>
        {answers.map((a) => (
          <p>{a.correctAnswer}</p>
        ))}
      </div>
      <Button onClick={() => handleClick()}></Button>
    </div>
  );
}

export { FunctionalAnswerUpdater };
