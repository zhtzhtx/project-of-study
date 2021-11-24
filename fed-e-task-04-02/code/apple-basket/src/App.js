import AppleBasket from "./components/AppleBasket";
import { RootStoreProvider } from "./store"
import './App.scss'

function App() {
  return (
    <div className="App">
      <main>
        <RootStoreProvider>
          <AppleBasket />
        </RootStoreProvider>
      </main>
    </div>
  );
}

export default App;
