import { CalendarDays, Check, CircleCheckBig, CircleX, LockKeyhole, Mail, Pencil, SquareCheck, SquareX, UserRound, Wrench, X } from "lucide-react";
import { useState } from "react";

const AccountDetails = () => {
  const [toastMessage, setToastMessage] = useState<React.ReactNode>(null);
  const [toastType, setToastType] = useState<React.ReactNode>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Brubru",
    password: "IceIsTheBest",
    mail: "brubru@gmail.com",
    createdAt: "12/03/2024",
    updatedAt: "18/11/2024",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setToastType("success");
    setToastMessage(
      <div className="flex items-center space-x-2">
        <CircleCheckBig />
        <span>Modifications effectuées avec succès !</span>
      </div>
    );
    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 3000);
    console.log("Modifications effectuées :", formData);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setToastType("error");
    setToastMessage(
      <div className="flex items-center space-x-2">
        <CircleX />
        <span>Modifications annulées.</span>
      </div>
    );
    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 3000);
    console.log("Modifications annulées");
  };

  // const User = () => {
  // const API_URL = "http://localhost:3000";
  // const [user, setUser] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const getOneUser = (id: number) => {
  //   setIsLoading(true);
  //   fetch(${API_URL}/users/${id})
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUser(data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setIsLoading(false);
  //     })
  // };

  // useEffect(() => {
  //   getOneUser();
  // }, []);

  // if (isLoading) return <span className="loading loading-spinner loading-md"></span>

  // if (error) return <p>Erreur: {error}</p>
  // }

  return (
    <main className="main flex flex-col">
      <h1 className="h1 pb-8"><UserRound />👤 Mes informations</h1>

      {toastMessage && (
        <div className="toast toast-top toast-end">
          <div
            className={`alert ${toastType === "success" ? "alert-success" : "alert-error"}`}
          >
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <section className="bg-white p-6 border-t rounded-lg shadow-md max-w-xl mx-auto0">
        <form>
          <table className="table-auto w-full border-collapse">
            <tbody>
              <tr>
                <td className="td-title"><Pencil className="logo" /> Prénom :</td>
                <td className="td-content-disabled">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg  ${isEditing ? "td-content-enabled border-secondary" : "border-gray-300 bg-gray-100"
                      }`}
                  />
                </td>
              </tr>
              <tr className="border-t">
                <td className="td-title"><LockKeyhole className="logo" /> Mot de passe :</td>
                <td className="td-content-disabled">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${isEditing ? "td-content-enabled border-secondary" : "border-gray-300 bg-gray-100"
                      }`}
                  />
                </td>
              </tr>
              <tr className="border-t">
                <td className="td-title"><Mail className="logo" /> Adresse email :</td>
                <td className="td-content-disabled">
                  <input
                    type="email"
                    name="mail"
                    value={formData.mail}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${isEditing ? "td-content-enabled border-secondary" : "border-gray-300 bg-gray-100"
                      }`}
                  />
                </td>
              </tr>
              <tr className="border-t">
                <td className="td-title"><CalendarDays className="logo" /> Compte créé le :</td>
                <td className="td-content-disabled">
                  <input
                    type="text"
                    name="createdAt"
                    value={formData.createdAt}
                    disabled
                    className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg"
                  />
                </td>
              </tr>
              <tr className="border-t">
                <td className="td-title"><Wrench className="logo" /> Dernière mise à jour :</td>
                <td className="td-content-disabled">
                  <input
                    type="text"
                    name="updatedAt"
                    value={formData.updatedAt}
                    disabled
                    className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </section>
      <div className="flex space-x-4 mt-8">
        {!isEditing ? (
          <button
            type="button"
            className="btn"
            onClick={handleEditClick}
          >
            <Pencil className="logo" />Modifier
          </button>
        ) : (
          <>
            <button
              type="button"
              className="btn"
              onClick={handleSaveClick}
            >
              <Check className="logo" /><CircleCheckBig className="logo" /><SquareCheck className="logo" />✅ Valider
            </button>
            <button
              type="button"
              className="btn"
              onClick={handleCancelClick}
            >
              <X className="logo" /><CircleX className="logo" /><SquareX className="logo" />❌ Annuler
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default AccountDetails;
