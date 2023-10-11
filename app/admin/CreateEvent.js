"use client";

import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const initialValues = {
  title: "",
  description: "",
  image: "",
  eventDate: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
  eventDate: Yup.date().required("Event date is required"),
});

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const EventForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Handle form submission here, e.g., send data to a server
        console.log(values);
      }}
    >
      <Form>
        <MyTextInput label="Title" type="text" name="title" />
        <MyTextInput label="Description" type="textarea" name="description" />
        <MyTextInput label="Image" type="file" name="image" accept="image/*" />
        <MyTextInput label="Event Date" type="date" name="eventDate" />
        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Formik>
  );
};

export default EventForm;
