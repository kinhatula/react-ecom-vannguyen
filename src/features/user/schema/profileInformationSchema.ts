import * as yup from 'yup';

export const profileInformationSchema = yup
    .object({
        firstName: yup.string().required(),
        lastName: yup.string().required()
    })
    .required();

export const profilePasswordSchema = yup.object({
    currentPassword: yup.string().required(),
    newPassword: yup.string().required(),
    confirmNewPassword: yup.string().required()
});

export const profileAddressSchema = yup.object({
    street: yup.string().required(),
    province: yup.string().required(),
    country: yup.string().required(),
    postalCode: yup.number().required()
});
