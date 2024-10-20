import { useState } from "react";
import LabelComponent from "../componets/label.component";
import ButtonComponent from "../componets/button.component";
import { PageComponent } from "../componets/content";
import { useForm } from "react-hook-form";
import { FormComponent } from "../componets/form";
import useYupValidationResolver from "../hooks/form-validator.hook";
import * as yup from "yup";
import useAuthService from "../hooks/auth-service.hook";
import { EResponseCodes } from "../helpers/api-response";

const shema = yup.object({
  email: yup
    .string()
    .max(50, "Solo se permiten 50 caracteres")
    .required("El Correo es requerido."),
  password: yup
    .string()
    .max(16, "Solo se permiten 16 caracteres")
    .required("La contraseña es requerida"),
});

function LoginPage() {
  const resolver = useYupValidationResolver(shema);
  const form = useForm({ resolver });
  const { login } = useAuthService();

  // States
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmitForm = form.handleSubmit(async (data) => {
    setMessage("");
    setLoading(true);

    const res = await login(data);

    if (res.operation.code != EResponseCodes.OK) {
      setMessage(res.operation.message);
    }

    setLoading(false);
  });

  return (
    <main className=" flex-1 bg-gray-700 ">
      <PageComponent className="flex h-screen items-center justify-center">
        <PageComponent.ContentCard className="bg-gray-100">
          <FormComponent
            id="loginForm"
            onSubmit={onSubmitForm}
            className=" flex w-full flex-col items-center justify-center"
          >
            <LabelComponent
              type="SubTitle"
              value="Ingrese sus credenciales para iniciar sesión"
              className="mt-4 mb-4"
            />

            <FormComponent.Input
              idInput={"email"}
              typeInput={"text"}
              register={form.register}
              label={"Correo *"}
              disabled={loading}
              errors={form.formState.errors}
              className="mt-4 w-2/3"
              max={50}
            />

            <FormComponent.Input
              idInput={"password"}
              typeInput={"password"}
              register={form.register}
              label={"Contraseña *"}
              disabled={loading}
              errors={form.formState.errors}
              className="mt-4 w-2/3"
              max={16}
            />

            {message ? (
              <div className="m-3 max-w-screen-sm rounded-md border-2 border-solid border-red-800 bg-red-200 p-3 text-sm text-rose-800">
                {message}
              </div>
            ) : (
              <></>
            )}

            <ButtonComponent
              form="loginForm"
              buttonStyle="Primary"
              value="Iniciar Sesión"
              type="submit"
              className="mt-4"
              loading={loading}
            />
          </FormComponent>
        </PageComponent.ContentCard>
      </PageComponent>
    </main>
  );
}

export default LoginPage;
