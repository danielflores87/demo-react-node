import { getErrorMessage } from "../../helpers/core.functions";
import LabelComponent from "../label.component";

export function SelectComponent({
  idSelect,
  register,
  className,
  label,
  classNameLabel,
  errors,
  disabled,
  onChange,
  options,
  defaultValue = "",
  id,
  optionsRegister = {},
}) {
  const messageError = getErrorMessage(errors, idSelect);

  return (
    <div className={className}>
      <LabelComponent
        type="FormInput"
        htmlFor={idSelect}
        className={classNameLabel}
        value={label ?? ""}
      />
      <div>
        <select
          className={` ${
            messageError
              ? "border-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          } block w-full rounded-lg border bg-gray-50  p-2.5 text-sm text-gray-900 disabled:opacity-55 `}
          {...(register ? register(idSelect, optionsRegister) : {})}
          id={id}
          name={idSelect}
          disabled={disabled}
          onChange={onChange}
          defaultValue={defaultValue}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {messageError && (
          <div className="text-sm text-red-500">{messageError}</div>
        )}
      </div>
    </div>
  );
}
