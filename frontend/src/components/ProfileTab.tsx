import React, { useState } from 'react';
import { UserDetails } from "../types/User";
import { Pencil, Mail, LockKeyhole, CalendarDays, Wrench, Check, X } from 'lucide-react';
import { formatDateTime } from "../utils/FormatDateTime";
import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";

interface ProfileTabProps {
    userInfos: Partial<UserDetails>;
    onUpdateProfile: (values: FormValues) => Promise<void>;
}

interface FormValues {
    name: string;
    email: string;
    confirmEmail: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
}

const ProfileSchema = yup.object().shape({
    name: yup.string().required("Le nom est requis"),
    email: yup.string().email("Email invalide").required("L'email est requis"),
    confirmEmail: yup.string().oneOf([yup.ref('email')], 'Les emails doivent correspondre'),
    password: yup.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    newPassword: yup.string().min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Les mots de passe doivent correspondre'),
});

const ProfileTab: React.FC<ProfileTabProps> = ({ userInfos, onUpdateProfile }) => {
    const [isEditing, setIsEditing] = useState(false);

    const initialValues: FormValues = {
        name: userInfos.name || "",
        email: userInfos.email || "",
        confirmEmail: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        await onUpdateProfile(values);
        setIsEditing(false);
        setSubmitting(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Mon Profil</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={ProfileSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values, handleChange, isSubmitting }) => (
                    <Form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`mt-1 block w-full rounded-md ${isEditing ? 'border-gray-300' : 'border-transparent'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                            />
                            {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`mt-1 block w-full rounded-md ${isEditing ? 'border-gray-300' : 'border-transparent'} ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                            />
                            {errors.email && touched.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                        </div>

                        {isEditing && (
                            <>
                                <div>
                                    <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">Confirmer Email</label>
                                    <input
                                        type="email"
                                        name="confirmEmail"
                                        id="confirmEmail"
                                        value={values.confirmEmail}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300"
                                    />
                                    {errors.confirmEmail && touched.confirmEmail && <div className="text-red-500 text-sm mt-1">{errors.confirmEmail}</div>}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300"
                                    />
                                    {errors.password && touched.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        id="newPassword"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300"
                                    />
                                    {errors.newPassword && touched.newPassword && <div className="text-red-500 text-sm mt-1">{errors.newPassword}</div>}
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300"
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
                                </div>
                            </>
                        )}

                        <div>
                            <p className="text-sm text-gray-500">
                                <CalendarDays className="inline-block mr-2" />
                                Compte créé le : {formatDateTime(userInfos.createAt || '')}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                <Wrench className="inline-block mr-2" />
                                Dernière mise à jour : {formatDateTime(userInfos.updatedAt || '')}
                            </p>
                        </div>

                        {isEditing ? (
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    <Check className="inline-block mr-2" />
                                    Sauvegarder
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                >
                                    <X className="inline-block mr-2" />
                                    Annuler
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            >
                                <Pencil className="inline-block mr-2" />
                                Modifier
                            </button>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProfileTab;

