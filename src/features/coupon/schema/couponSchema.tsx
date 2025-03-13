import * as yup from 'yup';

export const couponCreateSchema = yup
    .object({
        code: yup.string().required(),
        discountPrice: yup.number().positive().required(),
        discountType: yup.string().oneOf(['VALUE', 'PERCENT']).required()
    })
    .required();
