import { Formik } from "formik";
import { Input, Button, Tag } from "antd";
import { addNewStudent } from "../client";

const inputStyle = { marginBottom: "5px" };
const tagStyle = { backgroundColor: "#f50", color: "white", ...inputStyle };

const AddStudentsForm = (props) => {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", gender: "", email: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.firstName) {
          errors.firstName = "First Name Required";
        }
        if (!values.lastName) {
          errors.lastName = "Last Name Required";
        }

        if (!values.email) {
          errors.email = "Email Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.gender) {
          errors.gender = "Gender Required";
        } else if (
          !["MALE", "male", "FEMALE", "female"].includes(values.gender)
        ) {
          errors.gender = "Gender must be (MALE, male, FEMALE, female)";
        } else if (values.gender) {
          values.gender = values.gender.toUpperCase();
        }
        return errors;
      }}
      onSubmit={(student, { setSubmitting }) => {
        addNewStudent(student).then((res) => {
          props.onSuccess();
          setSubmitting(false);
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
        isValid,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            style={inputStyle}
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            placeholder="First Name. E.g John"
          />
          {errors.firstName && touched.firstName && (
            <Tag style={tagStyle}>{errors.firstName}</Tag>
          )}
          <Input
            style={inputStyle}
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            placeholder="Last Name. E.g Doe"
          />
          {errors.lastName && touched.lastName && (
            <Tag style={tagStyle}>{errors.lastName}</Tag>
          )}
          <Input
            style={inputStyle}
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Email  E.g examplegmail.com"
          />
          {errors.email && touched.email && (
            <Tag style={tagStyle}>{errors.email}</Tag>
          )}
          <Input
            style={inputStyle}
            name="gender"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gender}
            placeholder="Gender  E.g Male or Female"
          />
          {errors.gender && touched.gender && (
            <Tag style={tagStyle}>{errors.gender}</Tag>
          )}
          <br />
          <Button
            type="submit"
            disabled={isSubmitting | (touched && !isValid)}
            onClick={() => submitForm()}
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AddStudentsForm;
