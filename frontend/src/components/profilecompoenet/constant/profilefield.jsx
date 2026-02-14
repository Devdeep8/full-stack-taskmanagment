export const PROFILEFIELDS = [
  {
    name: "name",
    label: "Full Name",
    type: "input",
    placeholder: "Jason Miller",
    rules: {
      required: "Full name is required",
      minLength: { value: 3, message: "Min 3 characters" },
      maxLength: { value: 50, message: "Max 50 characters" },
    },
  },
  {
    name: "username",
    label: "Username",
    type: "input",
    placeholder: "jmiller23",
    disabled: true, // ✅ prefilled + readonly
    readOnly: true,

    rules: {
      required: "Username is required",
      minLength: { value: 3, message: "Min 3 characters" },
      maxLength: { value: 20, message: "Max 20 characters" },
    },
  },
  {
    name: "email",
    label: "E-Mail ID",
    type: "input",
    disabled: true, // ✅ prefilled + readonly
    readOnly: true,
    placeholder: "Enter your e-mail id",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Invalid email address",
      },
    },
  },
  {
    name: "phone",
    label: "Phone. No.",
    type: "input",
    placeholder: "0000000000",
    rules: {
      required: "Phone number is required",
      pattern: {
        value: /^[6-9]\d{9}$/,
        message: "Enter valid 10 digit number",
      },
    },
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    rules: { required: "Please select gender" },
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    rules: {
      required: "Date of birth is required",
    },
  },
  {
    name: "address",
    label: "Address",
    type: "input",
    rules: {
      required: "Address is required",
      minLength: { value: 10, message: "Min 10 characters" },
    },
  },
  {
    name: "zipcode",
    label: "Zip Code",
    type: "select",
    rules: { required: "Zip code is required" },
    options: [
      { label: "452001", value: "452001" },
      { label: "452002", value: "452002" },
      { label: "452003", value: "452003" },
    ],
  },
  {
    name: "state",
    label: "State",
    type: "select",
    rules: { required: "State is required" },
    options: [
      { label: "Madhya Pradesh", value: "MP" },
      { label: "Maharashtra", value: "MH" },
      { label: "Gujarat", value: "GJ" },
      { label: "Rajasthan", value: "RJ" },
    ],
  },
];
