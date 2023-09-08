export const validateSchema = (schema) => async (req, res, next) => {
	try{
		req.body = await schema.validate(req.body);
		return next();
	}catch (error){
		return res.status(422).json(error.errors);
	}
}