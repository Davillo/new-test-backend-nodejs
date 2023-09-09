import * as yup from 'yup';

export const createProductSchema = yup.object({
    title: yup.string().required('O campo title é obrigatório e deve ser uma string.'),
    description: yup.string().required('O campo description é obrigatório e deve ser uma string.'),
    price: yup.number().required('O campo price deve ser informado e deve ser um number.'),
    category_id: yup.number().required('O campo category_id deve ser informado e como um number.'),
    owner_id: yup.number().required('O campo owner_id é obrigatório e deve ser um number.'),
});

export const updateProductSchema = createProductSchema.partial();