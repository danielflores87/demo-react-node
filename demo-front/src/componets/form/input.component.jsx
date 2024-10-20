
import { getErrorMessage } from "../../helpers/core.functions";
import LabelComponent from "../label.component";

export function InputComponent({
  idInput,
  typeInput,
  register,
  className,
  placeholder,
  value,
  label,
  classNameLabel,
  errors,
  disabled,
  onChange,
  defaultValue,
  id,
  fieldArray,
  optionsRegister = {},
  max,
  min,
}) {
  const messageError = getErrorMessage(errors, idInput);

  return (
    <div className={className}>
      <LabelComponent
        type="FormInput"
        htmlFor={idInput}
        className={classNameLabel}
        value={label ?? ""}
      />
      <div>
        <input
          className={` ${messageError ? "border-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"} block w-full rounded-lg border bg-gray-50  p-2.5 text-sm text-gray-900 disabled:opacity-55 `}
          {...(register ? register(idInput, optionsRegister) : {})}
          id={id}
          name={idInput}
          type={typeInput}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          value={value}
          maxLength={max}
          minLength={min}
          max={max}
          min={min}
        />
        {messageError && (
          <div className="text-sm text-red-500">{messageError}</div>
        )}
      </div>
    </div>
  );
}
