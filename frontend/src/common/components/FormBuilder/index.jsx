import { Controller } from "react-hook-form";
import { FIELD_MAP } from "../../constants/fields";

export default function DynamicForm({
  fields,
  form,
  onSubmit,
  submitButtonText = "Submit",
  showButton = true,
  formId = "form",
  className = ""
 
}) {
  const { control, handleSubmit  , } = form;
  
  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className={`px-4  ${className}`}>
      {fields.map((f) => {
        const FieldComponent = FIELD_MAP[f.type];

        if (!FieldComponent) {
          console.warn(`No component found for field type: ${f.type}`);
          return null;
        }

        return (
          <Controller
            key={f.name}
            name={f.name}
            control={control}
            rules={f.rules}
            render={({ field, fieldState }) => (
              <FieldComponent
                field={field}
                config={f}
                error={fieldState.error}
                isDirty={fieldState.isDirty}
                isTouched={fieldState.isTouched}
                invalid={fieldState.invalid}

                inputProps={f.inputProps}   
                errorProps={f.errorProps}   
              />
            )}
          />
        );
      })}

      {showButton && (
        <button
          type="submit"
          className=" bg-dark-3  px-4 py-2 mt-4 rounded-lg"
        >
          {submitButtonText}
        </button>
      )}
    </form>
  );
}
