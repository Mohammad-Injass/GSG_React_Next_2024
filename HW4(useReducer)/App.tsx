import { useReducer, useEffect } from "react";
import "./App.css";
import { IStudent } from "./types";

import Student from "./components/student/student.component";
import AddForm from "./components/add-form/add-form.component";
import useLocalStorage from "./hooks/local-storage.hook";


const initialState = {
  studentsList: IStudent,
  totalAbsents: 0,
};

function reducer(state: typeof initialState, action: any) {
  switch (action.type) {
    case "LOAD_FROM_STORAGE":
      const totalAbs = action.payload.reduce(
        (prev: number, cur: IStudent) => prev + cur.absents,
        0
      );
      return {
        studentsList: action.payload,
        totalAbsents: totalAbs,
      };
    case "ADD_STUDENT":
      return {
        ...state,
        studentsList: [action.payload, ...state.studentsList],
      };
    case "REMOVE_FIRST":
      const newList = [...state.studentsList];
      newList.shift();
      return {
        ...state,
        studentsList: newList,
      };
    case "UPDATE_ABSENTS":
      const { id, change } = action.payload;
      return {
        ...state,
        studentsList: state.studentsList.map((student) =>
          student.id === id
            ? { ...student, absents: student.absents + change }
            : student
        ),
        totalAbsents: state.totalAbsents + change,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { storedData } = useLocalStorage(state.studentsList, "students-list");

  useEffect(() => {
    const stdList: IStudent[] = storedData || [];
    dispatch({ type: "LOAD_FROM_STORAGE", payload: stdList });
  }, [storedData]);

  const removeFirst = () => {
    dispatch({ type: "REMOVE_FIRST" });
  };

  const handleAbsentChange = (id: string, change: number) => {
    dispatch({ type: "UPDATE_ABSENTS", payload: { id, change } });
  };

  const handleAddStudent = (newStudent: IStudent) => {
    dispatch({ type: "ADD_STUDENT", payload: newStudent });
  };

  const h1Style = { color: "#69247C", fontSize: "24px" };

  return (
    <div className="main wrapper">
      <h1 style={h1Style}>Welcome to GSG React/Next Course</h1>
      <AddForm className="addForm" onSubmit={handleAddStudent} />
      <div className="stats">
        <button onClick={removeFirst}>POP Student</button>
        <b style={{ fontSize: "12px", fontWeight: 100, color: "gray" }}>
          Total Absents {state.totalAbsents}
        </b>
      </div>
      {state.studentsList.map((student) => (
        <Student
          key={student.id}
          id={student.id}
          name={student.name}
          age={student.age}
          absents={student.absents}
          isGraduated={student.isGraduated}
          coursesList={student.coursesList}
          onAbsentChange={handleAbsentChange}
        />
      ))}
    </div>
  );
}

export default App;
