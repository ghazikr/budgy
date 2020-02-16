import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import DateFnsUtils from "@date-io/date-fns";
import { TextField, MenuItem, ListSubheader, Icon } from "@material-ui/core";
import { useField } from "formik";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { useStyles } from "./auth/signin";

function MyTextField({ label, type, ...props }) {
  const classes = useStyles();
  const [field, meta] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      variant="outlined"
      className={classes.formControl}
      required
      fullWidth
      autoFocus
      type={type}
      {...field}
      label={label}
      helperText={errorText}
      error={!!errorText}
    />
  );
}
function MySelectField({ label, items, ...props }) {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        {...field}
        value={field.value}
        labelWidth={labelWidth}
      >
        {items}
      </Select>
    </FormControl>
  );
}
const OTHER_CATEGORIES = {
  food: [
    "fastfood",
    "local_pizza",
    "free_breakfast",
    "local_dining",
    "outdoor_grill"
  ],
  transportation: ["drive_eta", "commute", "motorcycle", "directions_transit"],
  shopping: ["local_grocery_store", "shopping_basket", "add_shopping_cart"],
  entertainment: []
};

function IconPicker({ label, items, ...props }) {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const categoriesItems = Object.keys(OTHER_CATEGORIES).map(categoryName => {
    const items = OTHER_CATEGORIES[categoryName];
    const menuItemsbyCategory = items.map(item => (
      <MenuItem key={item} value={item}>
        <Icon>{item}</Icon>
      </MenuItem>
    ));

    return [
      <ListSubheader>{categoryName}</ListSubheader>,
      ...menuItemsbyCategory
    ];
  });
  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel ref={inputLabel} id="grouped-select">
        {label}
      </InputLabel>
      <Select
        id="grouped"
        labelId="grouped-select"
        labelWidth={labelWidth}
        {...field}
      >
        {categoriesItems}
      </Select>
    </FormControl>
  );
}

const MyCustomDatePicker = ({ field, form, ...props }) => {
  const classes = useStyles();
  // const [field, meta] = useField(props);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        label={field.label}
        autoOk
        fullWidth
        inputVariant="outlined"
        value={field.value}
        onChange={date => form.setFieldValue(field.name, date, false)}
      />
    </MuiPickersUtilsProvider>
  );
};

export { MyTextField, MySelectField, MyCustomDatePicker, IconPicker };
