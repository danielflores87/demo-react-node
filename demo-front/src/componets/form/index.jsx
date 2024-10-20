import { InputComponent } from "./input.component";
import { SelectComponent } from "./select.componet";
import ButtonComponent from "../button.component";
import PropTypes from "prop-types";

function FormBaseComponent({ className, id, onSubmit, children }) {
  return (
    <form className={className} id={id} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

FormBaseComponent.propTypes = {
  id: PropTypes.string,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired, 
};

export const FormComponent = Object.assign(FormBaseComponent, {
  Input: InputComponent,
  Button: ButtonComponent,
  Select: SelectComponent,
});
