import { Routes, Route } from "react-router-dom";
import TaskList from './TaskList';
import TaskDetails from "./TaskDetails";
import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
      </Routes>
    </div>
  );
}

export default App;
