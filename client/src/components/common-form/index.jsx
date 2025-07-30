import { Button } from "../ui/button";
import FormFields from "./FormFields";

function CommonForm({
  courseId = null,
  loading = null,
  handleSubmit,
  buttonText = "Submit",
  formFields = [],
  formData,
  setFormData,
  isButtonDisabled = false,
}) {
  return (
    <form onSubmit={(e) => handleSubmit(e, courseId)}>
      <FormFields
        formFields={formFields}
        formData={formData}
        setFormData={setFormData}
      />
      <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full">
        {loading ? loading : buttonText}
      </Button>
    </form>
  );
}

export default CommonForm;
