import * as yup from 'yup';

export const createCategorySchema = yup.object({
    title: yup.string().required('O campo title é obrigatório e deve ser uma string.'),
    description: yup.string().required('O campo description é obrigatório e deve ser uma string.'),
    owner_id: yup.number().required('O campo owner_id é obrigatório e deve ser um number.')
});

export const updateCategorySchema = createCategorySchema.partial();