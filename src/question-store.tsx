import { createContext, useContext, ReactNode, FC, useState } from "react";

interface Answer {
  question: string;
  correctAnswer: string;
  selectedAnswer: string;
  correct: boolean;
}

interface QuestContextValue {
  selectedCategory: string;
  answers: Answer[];
  submitAnswer: (selected: string, correct: string, question: string) => void;
}

const questContext = createContext<QuestContextValue | undefined>(undefined);

interface QuestProviderProps {
  selectedCategory: string;
  children: ReactNode;
}

export const QuestProvider: FC<QuestProviderProps> = ({
  children,
  selectedCategory,
}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const submitAnswer = (
    selected: string,
    correct: string,
    question: string
  ) => {
    const newAnswer: Answer = {
      question: question,
      selectedAnswer: selected,
      correctAnswer: correct,
      correct: correct == selected,
    };
    setAnswers([...answers, newAnswer]);
  };

  const questContextValue: QuestContextValue = {
    answers,
    submitAnswer,
    selectedCategory,
  };

  return (
    <questContext.Provider value={questContextValue}>
      {children}
    </questContext.Provider>
  );
};

// Create a custom hook to use the CounterContext

export const useAnswers = (): QuestContextValue => {
  const context = useContext(questContext);

  if (!context) {
    throw new Error("ovider");
  }
  return context;
};

export { questContext };
