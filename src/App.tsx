import NavComponent from "./components/nav-component";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  Array.prototype.options = function (correct: string): string[] {
    const randomOption = Math.floor(Math.random() * 4);
    const options = [...this];
    options.splice(randomOption, 0, correct);
    return options;
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavComponent />
    </ThemeProvider>
  );
}

export default App;
