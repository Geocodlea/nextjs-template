"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Alert, Button, Box } from "@mui/material";

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

const CreateEventForm = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [file, setFile] = useState();

  const onSubmit = async (values) => {
    try {
      let formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("image", values.image);
      formData.append("eventDate", values.eventDate);
      formData.append("eventType", values.eventType);

      console.log(formData.get("image"));

      const response = await fetch("/api/events", {
        method: "POST",
        body: formData, // JSON.stringify(values),
        // headers: {
        //   "Content-type": "application/json",
        // },
      });

      if (!response.ok) {
        // Check for non-successful HTTP status codes
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setIsSuccessful(true);
      setHasError(false);
    } catch (error) {
      // Handle any errors that occurred during the fetch operation
      setIsSuccessful(false);
      setHasError(true);
    }
  };

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
          //   onChange={(e) => setFile(e.target.files?.[0])}
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

        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "12px", marginBottom: "20px" }}
          >
            Submit
          </Button>
          {hasError && (
            <Alert
              onClose={() => {
                setHasError(false);
              }}
              severity="error"
            >
              Error creating event
            </Alert>
          )}
          {isSuccessful && (
            <Alert
              onClose={() => {
                setIsSuccessful(false);
              }}
              severity="success"
            >
              Event created successfully
            </Alert>
          )}
        </Box>
      </Form>
    </Formik>
  );
};

export default CreateEventForm;
