import InputField from "../components/generic-controller/fields/InputField";
import PasswordField from "../components/generic-controller/fields/PasswordField";
import CheckboxField from "../components/generic-controller/fields/CheckboxField";
import SelectField from "../components/generic-controller/fields/SelectField";
import DateField from "../components/generic-controller/fields/DateField";
import NumberField from "../components/generic-controller/fields/NumberField";


export const FIELD_MAP = {
  input: InputField,
  tel : NumberField,
  password: PasswordField,
  checkbox: CheckboxField,
  select : SelectField,
  date : DateField
};
