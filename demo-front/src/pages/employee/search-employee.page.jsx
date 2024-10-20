import { useNavigate } from "react-router-dom";
import { AppContext } from "../../app.context";
import { PageComponent } from "../../componets/content";
import ButtonComponent from "../../componets/button.component";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FormComponent } from "../../componets/form";
import { IoSearch } from "react-icons/io5";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../hooks/form-validator.hook";
import * as yup from "yup";
import { Table } from "antd";
import { useEmployeeService } from "../../hooks/employee-service.hook";
import { EResponseCodes } from "../../helpers/api-response";
import ModalMessageComponent from "../../componets/modal-message.component";

const formShema = yup.object({
  name: yup.string().optional(),
});

function SearchEmployeePage() {
  // Servicios
  const { getPaginatedEmployees, deleteEmployee } = useEmployeeService();
  const { validateActionAccess } = useContext(AppContext);
  const navigate = useNavigate();
  const form = useForm({
    resolver: useYupValidationResolver(formShema),
  });

  const pageSize = 5;

  // States
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [message, setMessage] = useState();

  // Metodo que se comunica con la api
  async function onSearch(page, PerPage, data) {
    setLoading(true);
    const res = await getPaginatedEmployees({
      ...data,
      page: page,
      perPage: PerPage,
    });

    if (res.operation.code === EResponseCodes.OK) {
      setEmployeeList(res.data.rows);
      setTotal(res.data.total);
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
        deleteEmployee(id).then((res) => {
          if (res.operation.code == EResponseCodes.OK) {
            const values = form.getValues();
            onSearch(1, pageSize, values);
          } else {
            setMessage({
              type: res.operation.code,
              title: `Eliminar Empleado`,
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
          title="Consultar Usuarios"
          headOptions={
            <ButtonComponent
              value="Crear Empleado"
              buttonStyle="Tetriary"
              icon={<IoIosAddCircleOutline />}
              action={() => navigate("/employees/create")}
              disabled={loading}
            />
          }
        >
          <PageComponent.ContentCard>
            <FormComponent onSubmit={onSubmitSearch}>
              <PageComponent.GridCard>
                <FormComponent.Input
                  idInput={"name"}
                  typeInput={"text"}
                  register={form.register}
                  label={"Nombre"}
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
              { title: "Codigo", dataIndex: "id", key: "id" },
              { title: "Nombre", dataIndex: "name", key: "name" },
              {
                title: "Fecha Ingreso",
                dataIndex: "entryDate",
                key: "entryDate",
              },
              { title: "Salario", dataIndex: "salary", key: "salary" },
              {
                title: "Acciones",
                dataIndex: "id",
                key: "index",
                render: (_, record) => (
                  <span>
                    <a onClick={() => confirmDelete(record.id)}>Eliminar</a>
                  </span>
                ),
              },
            ]}
            dataSource={employeeList.map((i) => {
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

export default React.memo(SearchEmployeePage);
