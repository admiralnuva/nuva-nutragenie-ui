import { Switch, Route } from "wouter";

function SplashTest() {
  return (
    <div className="h-screen bg-gradient-to-br from-green-500 to-emerald-600 flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">NutraGenie</h1>
        <p className="text-white mb-8 text-xl">Your AI nutrition platform</p>
        <div className="space-y-4 w-full max-w-xs">
          <button className="w-full bg-white text-green-600 py-4 px-6 rounded-xl font-semibold text-lg">
            Start Account Creation
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/" component={SplashTest} />
    </Switch>
  );
}

export default App;
