import { Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Container from "./Container";
import "./Footer.css";

const studentCountAvatar = (int) => (
  <Avatar
    style={{
      backgroundColor: "#f56a00",
      marginRight: "5px",
    }}
    size="large"
  >
    {int}
  </Avatar>
);

const Footer = (props) => (
  <div className="footer">
    <Container>
      {props.numberOfStudents ? (
        <>{studentCountAvatar(props.numberOfStudents)}</>
      ) : (
        <>{studentCountAvatar(0)}</>
      )}
      <Button type="primary" onClick={() => props.handleAddStudent()}>
        Add new student +
      </Button>
    </Container>
  </div>
);

export default Footer;
