const Joi = require('joi');

const schema = Joi.object({
	name: Joi.string().min(3).required(),
	completed: Joi.boolean(),
});

const validateTask = (task) => schema.validate(task);

module.exports = { validateTask };
