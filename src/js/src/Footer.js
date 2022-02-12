import { Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Container from "./Container";
import "./Footer.css";

const Footer = (props) => (
  <div className="footer">
    <Container>
      {props.numberOfStudents ? (
        <Avatar
          style={{
            backgroundColor: "#f56a00",
            marginRight: "5px",
          }}
          size="large"
        >
          {props.numberOfStudents}
        </Avatar>
      ) : null}
      <Button type="primary" onClick={() => props.handleAddStudent()}>
        Add new student +
      </Button>
    </Container>
  </div>
);

export default Footer;
