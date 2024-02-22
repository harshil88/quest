import { ThemeProvider } from "./components/theme-provider";
import { FunctionalAnswerUpdater } from "./dummyC";
import { QuestProvider } from "./question-store";

function App() {
  Array.prototype.options = function (correct: string): string[] {
    const randomOption = Math.floor(Math.random() * 4);
    const options = [...this];
    options.splice(randomOption, 0, correct);
    return options;
  };

  return (
    <QuestProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <FunctionalAnswerUpdater />
      </ThemeProvider>
    </QuestProvider>
  );
}

export default App;
