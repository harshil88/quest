import React, {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
} from "react";

interface Answer {
  correctAnswer: string;
  selectedAnswer: string;
  correct: boolean;
}

interface QuestContextValue {
  answers: Answer[];
  submitAnswer: (selected: string, correct: string) => void;
}

const questContext = createContext<QuestContextValue | undefined>(undefined);

interface QuestProviderProps {
  children: ReactNode;
}

export const QuestProvider: FC<QuestProviderProps> = ({ children }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const submitAnswer = (selected: string, correct: string) => {
    const newAnswer: Answer = {
      selectedAnswer: selected,
      correctAnswer: correct,
      correct: correct == selected,
    };
    setAnswers([...answers, newAnswer]);
  };

  const questContextValue: QuestContextValue = {
    answers,
    submitAnswer,
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
