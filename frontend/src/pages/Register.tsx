import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../context/authContext";

interface InitialValues {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  gcu: boolean;
}

const Register: React.FC = () => {
  const RegisterSchema = yup.object({
    name: yup
      .string()
      .min(3, "Le prénom doit contenir au moins 3 caractères")
      .max(50, "Le prénom ne doit pas dépasser 50 caractères")
      .required("Champ requis"),
    email: yup
      .string()
      .email("L'e-mail n'est pas valide")
      .required("Champ requis"),
    confirmEmail: yup
      .string()
      .oneOf([yup.ref("email"), undefined], "Les e-mails ne correspondent pas")
      .required("Champ requis"),
    password: yup
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(32, "Le mot de passe ne doit pas dépasser 32 caractères")
      .required("Champ requis"),
    gcu: yup.boolean().oneOf([true], "Vous devez accepter les conditions"),
  });

  const initialValues: InitialValues = {
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    gcu: false,
  };

  const url = import.meta.env.VITE_API_URL;
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] =
    useState<"success" | "error" | "warning" | null>(null);

  const register = async (values: InitialValues) => {
    try {
      const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json(); // Récupérer la réponse JSON

      if (response.ok) {
        setToastMessage("Inscription réussie ! Redirection...");
        setToastType("success");
        setTimeout(() => navigate("/connexion"), 2000);
      } else if (response.status === 409) {
        // Vérifiez si l'erreur est un e-mail déjà utilisé (code 409 Conflict)
        setToastMessage("Cet e-mail est déjà utilisé. Essayez un autre.");
        setToastType("error");
      } else {
        setToastMessage(data.message ||"Erreur lors de l'inscription.");
        setToastType("error");
      }
    } catch {
      setToastMessage("Une erreur est survenue.");
      setToastType("error");
    }
  };

  const handleSubmit = (values: InitialValues) => {
    register(values);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <main className="main flex justify-center items-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        {toastMessage && toastType && (
          <div
            className={`alert ${
              toastType === "success"
                ? "alert-success"
                : toastType === "error"
                ? "alert-error"
                : "alert-warning"
            }`}
          >
            {toastMessage}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form className="flex flex-col gap-6">
              <h1 className="text-2xl font-bold text-center mb-4">
                Inscription
              </h1>

              <label className="flex flex-col gap-2">
                <span className="font-medium">Prénom</span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John"
                  className="input input-bordered"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <span className="text-red-600 text-sm">{errors.name}</span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-medium">E-mail</span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="exemple@mail.com"
                  className="input input-bordered"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <span className="text-red-600 text-sm">{errors.email}</span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-medium">Confirmation de l'e-mail</span>
                <input
                  type="email"
                  name="confirmEmail"
                  id="confirmEmail"
                  placeholder="exemple@mail.com"
                  className="input input-bordered"
                  value={values.confirmEmail}
                  onChange={handleChange}
                />
                {errors.confirmEmail && touched.confirmEmail && (
                  <span className="text-red-600 text-sm">
                    {errors.confirmEmail}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-medium">Mot de passe</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Mot de passe"
                  className="input input-bordered"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <span className="text-red-600 text-sm">{errors.password}</span>
                )}
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="gcu"
                  id="gcu"
                  className="checkbox"
                  checked={values.gcu}
                  onChange={handleChange}
                />
                <span>
                  J'accepte les conditions générales d'utilisation{" "}
                  <span className="text-red-600">*</span>
                </span>
              </label>
              {errors.gcu && touched.gcu && (
                <span className="text-red-600 text-sm">{errors.gcu}</span>
              )}

              <NavLink to="/connexion" className="text-blue-600 text-sm">
                Je possède déjà un compte
              </NavLink>

              <button
                type="submit"
                className={`btn btn-primary w-full ${
                  !values.name ||
                  !values.email ||
                  !values.confirmEmail ||
                  !values.password ||
                  !values.gcu
                    ? "btn-disabled"
                    : ""
                }`}
                disabled={
                  !values.name ||
                  !values.email ||
                  !values.confirmEmail ||
                  !values.password ||
                  !values.gcu
                }
              >
                Inscription
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default Register;