import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Toast from "../components/Toast";

interface InitialValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] =
    useState<"success" | "error" | "warning" | null>(null);

  const { isAuthenticated, loginAuth } = useAuth();

  const LoginSchema = yup.object({
    email: yup.string().email("L'e-mail n'est pas valide").required("Champ requis"),
    password: yup.string().required("Champ requis"),
  });

  const initialValues: InitialValues = {
    email: "",
    password: "",
  };

  const login = async (values: InitialValues) => {
    const { email, password } = values;
    try {
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      if (res.ok) {
        setToastMessage("Connexion réussie !");
        setToastType("success");
        const data = await res.json();
        if (data.user) {
          loginAuth(data.user);
        }
        navigate("/");
      } else {
        setToastMessage("Erreur de connexion. Veuillez réessayer.");
        setToastType("error");
      }
    } catch {
      setToastMessage("Une erreur est survenue.");
      setToastType("error");
    }
  };

  const handleSubmit = async (values: InitialValues) => {
    login(values);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  if (!isAuthenticated)
    return (
      <main className="main flex justify-center items-center">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          {toastType && toastMessage && (
            <Toast type={toastType} message={toastMessage} />
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-center mb-4">Connexion</h1>

                <label className="flex flex-col gap-2">
                  <span className="font-medium">E-mail</span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="exemple@mail.com"
                    className="input input-bordered"
                    onChange={handleChange}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <span className="text-red-600 text-sm">{errors.email}</span>
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
                    onChange={handleChange}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <span className="text-red-600 text-sm">{errors.password}</span>
                  )}
                </label>

                <NavLink to="/inscription" className="text-blue-600 text-sm">
                  Je n'ai pas de compte
                </NavLink>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={!values.email || !values.password}
                >
                  Connexion
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    );
};

export default Login;