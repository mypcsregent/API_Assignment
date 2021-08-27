const Joi=require('joi');

const schemas ={
    blogs: Joi.object().keys({
        title:Joi.string().required(),
        description:Joi.string().required(),
        date: Joi.date()
    }),
    products: Joi.object().keys({
        id:Joi.number().required(),
        name:Joi.string().required(),
        description: Joi.string()
    })
}

module.exports=schemas;
