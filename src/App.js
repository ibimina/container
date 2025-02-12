import './App.css';
import React, { Suspense } from "react";
// Importing the Microfrontend dynamically
const App = React.lazy(() => import("microfrontend/App"));
function AppPage() {
  return (
    <div>
    <h1>Host Application</h1>
    <Suspense fallback={<div>Loading Microfrontend...</div>}>
      <App />
    </Suspense>
  </div>
  );
}

export default AppPage;
