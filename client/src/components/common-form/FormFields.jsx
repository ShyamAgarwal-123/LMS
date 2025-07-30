import { number } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function FormFields({ formFields = [], formData, setFormData }) {
  function renderComponentByType(getFormItem) {
    let element = null;
    const currentFormItemValue = formData[getFormItem.name] || "";

    switch (getFormItem.componentType) {
      case "input":
        element = (
          <Input
            id={getFormItem.name}
            name={getFormItem.name}
            placeholder={getFormItem.placeholder}
            type={getFormItem.type}
            value={currentFormItemValue}
            onChange={(event) => {
              setFormData({
                ...formData,
                [getFormItem.name]: event.target.value,
              });
            }}
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getFormItem.name]: value,
              })
            }
            value={currentFormItemValue}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getFormItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getFormItem.options && getFormItem.options.length > 0
                ? getFormItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={getFormItem.name}
            name={getFormItem.name}
            placeholder={getFormItem.placeholder}
            value={currentFormItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getFormItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            id={getFormItem.name}
            name={getFormItem.name}
            placeholder={getFormItem.placeholder}
            type={getFormItem.type}
            value={currentFormItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getFormItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <div className="flex flex-col gap-3">
      {formFields.map((formItem) => (
        <div key={formItem.name}>
          <Label htmlFor={formItem.name}>{formItem.label}</Label>
          {renderComponentByType(formItem)}
        </div>
      ))}
    </div>
  );
}

export default FormFields;
