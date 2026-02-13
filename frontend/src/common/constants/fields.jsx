import InputField from "../components/generic-controller/fields/InputField";
import PasswordField from "../components/generic-controller/fields/PasswordField";
import CheckboxField from "../components/generic-controller/fields/CheckboxField";
import SelectField from "../components/generic-controller/fields/SelectField";
import DateField from "../components/generic-controller/fields/DateField";


export const FIELD_MAP = {
  input: InputField,
  password: PasswordField,
  checkbox: CheckboxField,
  select : SelectField,
  date : DateField
};
