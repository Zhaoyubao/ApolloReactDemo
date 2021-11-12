import { Routes, Route } from "react-router-dom";
import TaskList from './TaskList';
import TaskDetails from "./TaskDetails";
import './App.css';

function App() {

  return (
    <div className="App">
      <h2>Task Board</h2>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
      </Routes>
    </div>
  );
}

export default App;
