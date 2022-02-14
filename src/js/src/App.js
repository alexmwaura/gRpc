import { Component } from "react";
import { Table, Avatar, Spin, Modal, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getAllStudents } from "./client";
import Container from "./Container";
import Footer from "./Footer";
import AddStudentsForm from "./forms/AddStudentForm";
import { openNotification } from "./Notification";

const getIndicatorIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const columns = [
  {
    title: "",
    key: "avatar",
    render: (text, student) => (
      <Avatar size="large">
        {`${student.firstName.charAt(0).toUpperCase()}${student.lastName
          .charAt(0)
          .toUpperCase()}`}
      </Avatar>
    ),
  },
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

class App extends Component {
  state = {
    students: null,
    isFetching: false,
    numberOfStudents: 0,
    isAddStudentModalVisible: false,
    isError: false,
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    this.setState({
      isFetching: true,
    });
    getAllStudents()
      .then((res) => res.json())
      .then((students) => {
        this.setState({
          students,
          isFetching: false,
          numberOfStudents: students.length,
        });
      })
      .catch((error) => {
        const message = "Oops cannot get all students";
        openNotification("error", message, error.error);
        this.setState({
          isFetching: false,
          isError: true,
        });
      });
  };

  openAddStudentModal = () => this.setState({ isAddStudentModalVisible: true });
  closeAddStudentModal = () =>
    this.setState({ isAddStudentModalVisible: false });

  render() {
    const {
      students,
      isFetching,
      numberOfStudents,
      isAddStudentModalVisible,
      isError,
    } = this.state;

    const commonElements = () => (
      <div>
        <Modal
          title="Add new student"
          visible={isAddStudentModalVisible}
          onOk={this.closeAddStudentModal}
          onCancel={this.closeAddStudentModal}
          width={800}
        >
          <AddStudentsForm
            onSuccess={() => {
              this.closeAddStudentModal();
              this.fetchStudents();
            }}
          />
        </Modal>
        <Footer
          numberOfStudents={numberOfStudents}
          handleAddStudent={this.openAddStudentModal}
        />
      </div>
    );

    return (
      <div>
        {!isFetching ? (
          <Container>
            {isError ? (
              <Empty description={<h1>No students found</h1>} />
            ) : (
              <Table
                dataSource={students}
                columns={columns}
                rowKey="studentId"
                pagination={false}
              />
            )}
            {commonElements()}
          </Container>
        ) : (
          <Container>
            <Spin indicator={getIndicatorIcon} />
          </Container>
        )}
      </div>
    );
  }
}

export default App;
