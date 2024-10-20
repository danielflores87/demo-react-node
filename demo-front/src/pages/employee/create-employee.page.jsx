import { FaRegSave, FaRegUser } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { PageComponent } from "../../componets/content";
import React, { useState } from "react";
import useYupValidationResolver from "../../hooks/form-validator.hook";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormComponent } from "../../componets/form";
import { useEmployeeService } from "../../hooks/employee-service.hook";
import { EResponseCodes } from "../../helpers/api-response";
import ModalMessageComponent from "../../componets/modal-message.component";

const formShema = yup.object({
  name: yup.string().required("Valor requerido."),
  entryDate: yup.date().required("Valor requerido."),
  salary: yup.number().required("Valor requerido."),
});

function EmployeesFormComponent() {
  //Servicios
  const { createEmployee } = useEmployeeService();
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(formShema);
  const form = useForm({ resolver });

  // States
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  // Metodo que genera el submit del formulario
  const onSubmitForm = form.handleSubmit(async (data) => {
    setLoading(true);

    const res = await createEmployee(data);

    setMessage({
      type: res.operation.code,
      title: `Crear Empleado`,
      description: res.operation.message,
      onOk() {
        setMessage();
        if (res.operation.code == EResponseCodes.OK) navigate("/employees");
      },
    });

    setLoading(false);
  });

  return (
    <>
      <PageComponent.ContentCard>
        <FormComponent id="employeeForm" onSubmit={onSubmitForm}>
          <PageComponent.GridCard>
            <FormComponent.Input
              idInput={"name"}
              typeInput={"text"}
              register={form.register}
              label={"Nombre *"}
              max={50}
              disabled={loading}
              errors={form.formState.errors}
            />

            <FormComponent.Input
              idInput={"entryDate"}
              typeInput={"date"}
              register={form.register}
              label={"Fecha de Ingreso *"}
              disabled={loading}
              errors={form.formState.errors}
            />

            <FormComponent.Input
              idInput={"salary"}
              typeInput={"number"}
              register={form.register}
              label={"Salario *"}
              disabled={loading}
              errors={form.formState.errors}
            />
          </PageComponent.GridCard>
        </FormComponent>

        <PageComponent.ButtonsCard>
          <FormComponent.Button
            value="Cancelar"
            type="button"
            buttonStyle="Secondary"
            icon={<ImCancelCircle />}
            disabled={loading}
            action={() => {
              form.reset();
              navigate("/employees");
            }}
          />
          <FormComponent.Button
            buttonStyle="Primary"
            form="employeeForm"
            value="Guardar"
            type="submit"
            disabled={loading}
            loading={loading}
            icon={<FaRegSave />}
          />
        </PageComponent.ButtonsCard>
      </PageComponent.ContentCard>
      <ModalMessageComponent
        message={message}
        clearMessage={() => setMessage()}
      />
    </>
  );
}

function CreateEmployeePage() {
  return (
    <PageComponent>
      <PageComponent.ContentCard title="Crear Empleado" icon={<FaRegUser />}>
        <EmployeesFormComponent type="Create" />
      </PageComponent.ContentCard>
    </PageComponent>
  );
}

export default React.memo(CreateEmployeePage);
