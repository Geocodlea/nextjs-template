"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Box } from "@mui/material";

import {
  CustomTextField,
  //  CustomCheckbox,
  CustomSelect,
} from "@/utils/formsHelper";

const initialValues = {
  title: "",
  description: "",
  image: "",
  eventDate: "",
  eventType: "",
  //  isAgree: false,
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
  eventDate: Yup.date().required("Event date is required"),
  eventType: Yup.string().required("Event Type is required"),
  // isAgree: Yup.boolean().oneOf(
  //   [true],
  //   "You must agree to the terms and conditions"
  // ),
});

const onSubmit = (values) => {
  // Handle form submission here, e.g., send data to a server
  console.log(values);
};

const EventForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Field
          autoComplete="on"
          name="title"
          component={CustomTextField}
          label="Title"
          type="text"
        />

        <Field
          name="description"
          component={CustomTextField}
          label="Description"
          type="text"
          multiline
        />

        <Field
          name="image"
          component={CustomTextField}
          label="Image"
          type="file"
          accept="image/*"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Field
          name="eventDate"
          component={CustomTextField}
          label="Event Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Field
          name="eventType"
          component={CustomSelect}
          label="Event Type"
          options={[
            { value: "conference", label: "Conference" },
            { value: "seminar", label: "Seminar" },
            { value: "workshop", label: "Workshop" },
          ]}
        />

        {/* <Field
          name="isAgree"
          type="checkbox"
          component={CustomCheckbox}
          label="I agree"
        /> */}

        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default EventForm;
