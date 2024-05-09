import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [newHours, setNewHours] = useState("");

  useEffect(() => {
    const savedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(savedSubjects);
  }, []);

  const addSubject = () => {
    if (newSubject && newHours) {
      const updatedSubjects = [
        ...subjects,
        { subject: newSubject, hours: parseInt(newHours) },
      ];
      setSubjects(updatedSubjects);
      setNewSubject("");
      setNewHours("");

      localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    }
  };

  const increaseHours = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].hours += 1;
    setSubjects(updatedSubjects);
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
  };

  const decreaseHours = (index) => {
    const updatedSubjects = [...subjects];
    if (updatedSubjects[index].hours > 0) {
      updatedSubjects[index].hours -= 1;
      setSubjects(updatedSubjects);
      localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Education Planner</h1>
        <div className="input-container">
          <input
            type="text"
            className="input"
            placeholder="Subject"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <input
            type="number"
            className="input"
            placeholder="Hours"
            value={newHours}
            onChange={(e) => setNewHours(e.target.value)}
          />
          <button className="btn" onClick={addSubject}>
            Add
          </button>
        </div>
        {subjects.map((subject, index) => (
          <div className="subject" key={index}>
            <div className="subject-info">
              {subject.subject}-  {subject.hours} ⌛Hours
            </div>
            <div className="btns">
              <button
                onClick={() => increaseHours(index)}
                className="btn button-increase"
              >
                +
              </button>
              <button
                onClick={() => decreaseHours(index)}
                className="btn button-decrease"
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
