import { FaRegSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { PageComponent } from "../../componets/content";
import React, { useEffect, useState } from "react";
import useYupValidationResolver from "../../hooks/form-validator.hook";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormComponent } from "../../componets/form";
import { EResponseCodes } from "../../helpers/api-response";
import ModalMessageComponent from "../../componets/modal-message.component";
import { useApplicationService } from "../../hooks/application-service.hook";
import { GrDocumentUser } from "react-icons/gr";
import { useEmployeeService } from "../../hooks/employee-service.hook";

const formShema = yup.object({
  refenceCode: yup.string().required("Valor requerido."),
  description: yup.string().required("Valor requerido."),
  summary: yup.string().required("Valor requerido."),
  employeeId: yup.number().required("Valor requerido."),
});

function ApplicationsFormComponent() {
  //Servicios
  const { createApplication } = useApplicationService();
  const { getAllEmployees } = useEmployeeService();
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(formShema);
  const form = useForm({ resolver });

  // States
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [employeeList, setEmployeeList] = useState([]);

  // Effect que carga los listados
  useEffect(() => {
    getAllEmployees().then((res) => {
      if (res.operation.code == EResponseCodes.OK) {
        setEmployeeList(res.data);
      }
    });
  }, []);

  // Metodo que genera el submit del formulario
  const onSubmitForm = form.handleSubmit(async (data) => {
    setLoading(true);

    const res = await createApplication(data);

    setMessage({
      type: res.operation.code,
      title: `Crear Solicitud`,
      description: res.operation.message,
      onOk() {
        setMessage();
        if (res.operation.code == EResponseCodes.OK) navigate("/applications");
      },
    });

    setLoading(false);
  });

  return (
    <>
      <PageComponent.ContentCard>
        <FormComponent id="applicationForm" onSubmit={onSubmitForm}>
          <PageComponent.GridCard>
            <FormComponent.Input
              idInput={"refenceCode"}
              typeInput={"text"}
              register={form.register}
              label={"Codigo *"}
              max={50}
              disabled={loading}
              errors={form.formState.errors}
            />

            <FormComponent.Input
              idInput={"description"}
              typeInput={"text"}
              register={form.register}
              label={"Descripción *"}
              max={50}
              disabled={loading}
              errors={form.formState.errors}
            />

            <FormComponent.Input
              idInput={"summary"}
              typeInput={"text"}
              register={form.register}
              label={"Resumen *"}
              max={50}
              disabled={loading}
              errors={form.formState.errors}
            />
            <FormComponent.Select
              idSelect="employeeId"
              register={form.register}
              defaultValue="Seleccione..."
              label="Empleado *"
              options={employeeList.map((e) => {
                return { value: e.id, label: e.name };
              })}
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
              navigate("/applications");
            }}
          />
          <FormComponent.Button
            buttonStyle="Primary"
            form="applicationForm"
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

function CreateApplicationPage() {
  return (
    <PageComponent>
      <PageComponent.ContentCard
        title="Crear Solicitud"
        icon={<GrDocumentUser />}
      >
        <ApplicationsFormComponent type="Create" />
      </PageComponent.ContentCard>
    </PageComponent>
  );
}

export default React.memo(CreateApplicationPage);
