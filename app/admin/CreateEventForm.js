"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Alert, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  CustomTextField,
  //  CustomCheckbox,
  CustomSelect,
  CustomFileUpload,
} from "@/utils/formsHelper";

const initialValues = {
  title: "",
  description: "",
  image: "",
  date: "",
  type: "",
  //  isAgree: false,
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
  date: Yup.date().required("Event date is required"),
  type: Yup.string().required("Event Type is required"),
  // isAgree: Yup.boolean().oneOf(
  //   [true],
  //   "You must agree to the terms and conditions"
  // ),
});

const CreateEventForm = () => {
  const [alert, setAlert] = useState({ text: "", severity: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
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
      setAlert({ text: "Event created successfully", severity: "success" });
      setLoading(false);
    } catch (error) {
      // Handle any errors that occurred during the fetch operation
      setAlert({ text: "Error creating event", severity: "error" });
      setLoading(false);
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
          component={CustomFileUpload}
          label="Image"
          type="file"
          accept="image/*"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Field
          name="date"
          component={CustomTextField}
          label="Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Field
          name="type"
          component={CustomSelect}
          label="Type"
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
          <LoadingButton
            type="submit"
            loading={loading}
            loadingIndicator="Creating..."
            variant="contained"
            sx={{ marginTop: "12px", marginBottom: "20px" }}
          >
            Create
          </LoadingButton>
          {alert.text && (
            <Alert
              onClose={() => {
                setAlert({ text: "", severity: "" });
              }}
              severity={alert.severity}
            >
              {alert.text}
            </Alert>
          )}
        </Box>
      </Form>
    </Formik>
  );
};

export default CreateEventForm;
