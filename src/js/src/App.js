import { Component } from "react";
import { Table } from "antd";
import { getAllStudents } from "./client";
import Container from "./Container";

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

    const columns = [
      {
        title: "Student Id",
        dataIndex: "studentId",
        key: "studentId",
      },
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
      },
    ];

    return (
      <div>
        {students ? (
          <Container>
            <Table
              dataSource={students}
              columns={columns}
              rowKey="studentId"
              pagination={false}
            />
          </Container>
        ) : (
          <h1>No Students found</h1>
        )}
      </div>
    );
  }
}

export default App;
