import { useNavigate } from "react-router-dom";
import { AppContext } from "../../app.context";
import { PageComponent } from "../../componets/content";
import ButtonComponent from "../../componets/button.component";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FormComponent } from "../../componets/form";
import { IoCarSharp, IoSearch } from "react-icons/io5";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../hooks/form-validator.hook";
import * as yup from "yup";
import { Table } from "antd";
import { useApplicationService } from "../../hooks/application-service.hook";
import { EResponseCodes, ERoles } from "../../helpers/api-response";
import ModalMessageComponent from "../../componets/modal-message.component";

const formShema = yup.object({
  description: yup.string().optional(),
});

function SearchApplicationPage() {
  // Servicios
  const { getPaginatedApplications, deleteApplication } =
    useApplicationService();
  const { validateActionAccess } = useContext(AppContext);
  const navigate = useNavigate();
  const form = useForm({
    resolver: useYupValidationResolver(formShema),
  });

  const pageSize = 5;

  // States
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [applicationList, setApplicationList] = useState([]);
  const [message, setMessage] = useState();

  // Metodo que se comunica con la api
  async function onSearch(page, PerPage, data) {
    setLoading(true);
    const res = await getPaginatedApplications({
      ...data,
      page: page,
      perPage: PerPage,
    });

    if (res.operation.code === EResponseCodes.OK) {
      setApplicationList(res.data.rows);
      setTotal(res.data.total);
    } else {
      setMessage({
        type: res.operation.code,
        title: `Consultar Solicitud`,
        description: res.operation.message,
        onOk() {
          setMessage();
        },
      });
    }

    setLoading(false);
  }

  // Metodo ejecuta la busqueda
  const onSubmitSearch = form.handleSubmit(async (data) => {
    await onSearch(1, pageSize, data);
  });

  // Metodo que verifica la eliminacion
  async function confirmDelete(id) {
    setMessage({
      type: EResponseCodes.ASK,
      title: "Esta seguro de eliminar este registro?",
      description: "Esta accion es irreversible",
      okTitle: `Si`,
      cancelTitle: "No",
      onCancel() {
        setMessage();
      },
      onOk() {
        deleteApplication(id).then((res) => {
          if (res.operation.code == EResponseCodes.OK) {
            const values = form.getValues();
            onSearch(1, pageSize, values);
          } else {
            setMessage({
              type: res.operation.code,
              title: `Eliminar Solicitud`,
              description: res.operation.message,
              onOk() {
                setMessage();
              },
            });
          }
        });
      },
    });
  }

  return (
    <>
      <PageComponent>
        <PageComponent.ContentCard
          title="Consultar Solicitudes"
          headOptions={
            validateActionAccess(ERoles.ADMIN) && (
              <ButtonComponent
                value="Crear Solicitud"
                buttonStyle="Tetriary"
                icon={<IoIosAddCircleOutline />}
                action={() => navigate("/applications/create")}
                disabled={loading}
              />
            )
          }
        >
          <PageComponent.ContentCard>
            <FormComponent onSubmit={onSubmitSearch}>
              <PageComponent.GridCard>
                <FormComponent.Input
                  idInput={"description"}
                  typeInput={"text"}
                  register={form.register}
                  label={"Descripción"}
                  errors={form.formState.errors}
                  disabled={loading}
                />
              </PageComponent.GridCard>
              <PageComponent.ButtonsCard>
                <FormComponent.Button
                  icon={<IoSearch />}
                  buttonStyle="Primary"
                  value={"Buscar"}
                  type="submit"
                  loading={loading}
                />
              </PageComponent.ButtonsCard>
            </FormComponent>
          </PageComponent.ContentCard>
        </PageComponent.ContentCard>

        <PageComponent.ContentCard>
          <Table
            columns={[
              {
                title: "Codigo Ref.",
                dataIndex: "refenceCode",
                key: "refenceCode",
              },
              {
                title: "Descripcion",
                dataIndex: "description",
                key: "description",
              },
              {
                title: "Resumen",
                dataIndex: "summary",
                key: "summary",
              },
              { title: "Empleado", dataIndex: "employeeId", key: "employeeId" },
              {
                title: "Acciones",
                dataIndex: "id",
                key: "index",
                render: (_, record) =>
                  validateActionAccess(ERoles.ADMIN) && (
                    <ButtonComponent
                      value="Eliminar"
                      buttonStyle="Tetriary"
                      action={() => confirmDelete(record.id)}
                    />
                  ),
              },
            ]}
            dataSource={applicationList.map((i) => {
              return { ...i, key: i.id };
            })}
            pagination={{
              total: total,
              pageSize: pageSize,
              onChange: (page, pageSize) => {
                const values = form.getValues();
                onSearch(page, pageSize, values);
              },
            }}
          />
        </PageComponent.ContentCard>
      </PageComponent>
      <ModalMessageComponent
        message={message}
        clearMessage={() => setMessage()}
      />
    </>
  );
}

export default React.memo(SearchApplicationPage);
