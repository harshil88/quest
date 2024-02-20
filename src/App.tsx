import NavComponent from "./components/nav-component";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavComponent />
    </ThemeProvider>
  );
}

export default App;
