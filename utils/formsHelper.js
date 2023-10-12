import {
  TextField,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  MenuItem,
} from "@mui/material";

const CustomTextField = ({ field, form, ...props }) => (
  <TextField
    {...field}
    {...props}
    error={form.errors[field.name] && form.touched[field.name]}
    helperText={
      form.errors[field.name] && form.touched[field.name]
        ? form.errors[field.name]
        : ""
    }
    fullWidth
    margin="normal"
    rows="5"
  />
);

const CustomSelect = ({ field, form, options, ...props }) => (
  <TextField
    {...field}
    {...props}
    error={form.errors[field.name] && form.touched[field.name]}
    helperText={
      form.errors[field.name] && form.touched[field.name]
        ? form.errors[field.name]
        : ""
    }
    select
    fullWidth
    margin="normal"
  >
    {options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);

const CustomCheckbox = ({ field, form, label, ...props }) => (
  <FormControl>
    <FormControlLabel
      control={<Checkbox {...field} {...props} checked={field.value} />}
      label={label}
    />
    <FormHelperText error>
      {form.errors[field.name] && form.touched[field.name]
        ? form.errors[field.name]
        : ""}
    </FormHelperText>
  </FormControl>
);

export { CustomTextField, CustomSelect, CustomCheckbox };
