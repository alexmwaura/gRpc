import { Component } from "react";
import { getAllStudents } from "./client";

class App extends Component {
  state = {
    students: null,
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    getAllStudents()
      .then((res) => res.json())
      .then((students) => {
        this.setState({
          students,
        });
      });
  };

  render() {
    const { students } = this.state;

    return (
      <div>
        {students ? (
          students.map((student, i) => (
            <div key={i}>
              <h2>{student.studentId}</h2>
              <p>{student.firstName}</p>
              <p>{student.lastName}</p>
              <p>{student.email}</p>
              <p>{student.gender}</p>
            </div>
          ))
        ) : (
          <h1>No Students found</h1>
        )}
      </div>
    );
  }
}

export default App;
