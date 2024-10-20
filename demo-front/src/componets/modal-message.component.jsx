import React from "react";
import PropTypes from "prop-types";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import LabelComponent from "./label.component";
import { BsCheck2Circle } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { VscError } from "react-icons/vsc";
import { SlQuestion } from "react-icons/sl";
import { EResponseCodes } from "../helpers/api-response";
import ButtonsCardComponent from "./content/buttons-card.component";
import ButtonComponent from "./button.component";

export class Message {
  constructor(
    show,
    type,
    title,
    description = "",
    okTitle = "Aceptar",
    cancelTitle = "Cancelar",
    onOk = null,
    onCancel = null
  ) {
    this.show = show;
    this.type = type;
    this.title = title;
    this.description = description;
    this.okTitle = okTitle;
    this.cancelTitle = cancelTitle;
    this.onOk = onOk;
    this.onCancel = onCancel;
  }
}

function ModalMessageComponent({ message, clearMessage }) {
  if (!message) {
    return null;
  }

  const { type, description, title, onOk, onCancel } = message;

  let color = "";
  let icon = null;

  switch (type) {
    case EResponseCodes.OK:
      color = "#2f7e05";
      icon = <BsCheck2Circle color={color} />;
      break;
    case EResponseCodes.WARN:
      color = "#dd8b07";
      icon = <IoWarningOutline color={color} />;
      break;
    case EResponseCodes.FAIL:
      color = "#EF4444";
      icon = <VscError color={color} />;
      break;
    case EResponseCodes.ASK:
      color = "#3d9dea";
      icon = <SlQuestion color={color} />;
      break;
    default:
      break;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-35">
      <div className="relative m-10 min-w-56 max-w-screen-md rounded-lg bg-white p-5 shadow-md">
        <LabelComponent
          type="Title"
          value={
            <div className=" inline-flex items-center gap-x-2">
              <span className="text-3xl">{icon}</span> {title}
            </div>
          }
          display="Center"
          className="my-2"
        />

        <LabelComponent
          type="Regular"
          value={description ?? ""}
          display="Center"
          className="my-2"
        />

        <hr color={color} className="h-0.5 " />
        <ButtonsCardComponent className="mt-2">
          {onCancel && (
            <ButtonComponent
              value={message.cancelTitle ?? "Cancelar"}
              type="button"
              buttonStyle="Secondary"
              icon={<ImCancelCircle />}
              action={() => {
                if (onCancel) {
                  onCancel();
                }
              }}
            />
          )}

          <ButtonComponent
            value={message.okTitle ?? "Aceptar"}
            icon={<IoMdCheckmarkCircleOutline />}
            type="button"
            buttonStyle="Primary"
            action={() => {
              if (onOk) {
                onOk();
              }
              clearMessage();
            }}
          />
        </ButtonsCardComponent>
      </div>
    </div>
  );
}

ModalMessageComponent.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.oneOf([
      EResponseCodes.OK,
      EResponseCodes.WARN,
      EResponseCodes.FAIL,
      EResponseCodes.ASK,
    ]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    okTitle: PropTypes.string,
    cancelTitle: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }),

  clearMessage: PropTypes.func.isRequired,
};

export default React.memo(ModalMessageComponent);
