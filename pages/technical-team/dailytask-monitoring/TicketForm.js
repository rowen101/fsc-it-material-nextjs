import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from "../../../components/useForm";

const initialFValues = {
  id: "",
  customer_code: "",
  customer_name: "",
  status: "0",
  freshness_requirement: "",
  freshness_unit: "",
  customer_category: "",
};

export default function CustomerForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("customer_code" in fieldValues)
      temp.customer_code = fieldValues.customer_code
        ? ""
        : "This field is required.";
    if ("customer_name" in fieldValues)
      temp.customer_name = fieldValues.customer_name
        ? ""
        : "This field is required.";
    if ("freshness_requirement" in fieldValues)
      temp.freshness_requirement = fieldValues.freshness_requirement
        ? ""
        : "This field is required.";

    if ("freshness_unit" in fieldValues)
      temp.freshness_unit = fieldValues.freshness_unit
        ? ""
        : "This field is required.";
    if ("customer_category" in fieldValues)
      temp.customer_category = fieldValues.customer_category
        ? ""
        : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item lg={6} sm={6} xs={12}>
          <Controls.Input
            name="district"
            label="District"
            value={values.customer_code}
            onChange={handleInputChange}
            error={errors.customer_code}
          />
          <Controls.Input
            name="site"
            label="Site"
            value={values.customer_name}
            onChange={handleInputChange}
            error={errors.customer_name}
          />
          <Controls.Input
            type="text"
            label="type"
            name="freshness_requirement"
            value={values.freshness_requirement}
            onChange={handleInputChange}
            error={errors.freshness_requirement}
          />
          <Controls.Input
            type="text"
            label="type"
            name="type"
            value={values.freshness_requirement}
            onChange={handleInputChange}
            error={errors.freshness_requirement}
          />
          <Controls.Input
            type="text"
            label="Position"
            name="position"
            value={values.freshness_requirement}
            onChange={handleInputChange}
            error={errors.freshness_requirement}
          />
        </Grid>
        <Grid item lg={6} sm={6} xs={12}>
          <Controls.Input
            label="Ticket"
            name="freshness_unit"
            value={values.freshness_unit}
            onChange={handleInputChange}
            error={errors.freshness_unit}
          />
          <Controls.Input
            label="Subject"
            name="subject"
            value={values.customer_category}
            onChange={handleInputChange}
            error={errors.customer_category}
          />
          <Controls.Input
            label="Department"
            name="department"
            value={values.customer_category}
            onChange={handleInputChange}
            error={errors.customer_category}
          />
          <Controls.Input
            label="Remark"
            name="remark"
            value={values.customer_category}
            onChange={handleInputChange}
            error={errors.customer_category}
          />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Controls.Checkbox
                name="status"
                label="Status"
                value={values.status == "0" ? false : true}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Controls.Checkbox
                name="status"
                label="Status"
                value={values.status == "0" ? false : true}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Controls.Checkbox
                name="status"
                label="Status"
                value={values.status == "0" ? false : true}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Controls.Button type="submit" text="Submit" />
        <Controls.Button text="Reset" color="default" onClick={resetForm} />
      </div>
    </Form>
  );
}
