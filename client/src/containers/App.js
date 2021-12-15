import { Routes, Route } from "react-router-dom";
import MainSection from './MainSection';
import TaskDetails from "./TaskDetails";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
      </Routes>
    </div>
  );
}

export default App;
