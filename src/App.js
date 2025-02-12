import './App.css';
import React, { Suspense } from "react";
// Importing the Microfrontend dynamically
const MicroApp = React.lazy(() => import("microfrontend/MicroApp"));
function App() {
  return (
    <div>
    <h1>Host Application</h1>
    <Suspense fallback={<div>Loading Microfrontend...</div>}>
      <MicroApp />
    </Suspense>
  </div>
  );
}

export default App;
