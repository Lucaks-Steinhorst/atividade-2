import * as Yup from 'yup';
import Product from "../models/Product.js";

class ProductController {
    async list(req, res) {
        // consultar no banco os produtos
        const limit = req.query.limit || 3;
        const page = req.query.page || 1;

        Product.paginate({}, {page, limit}).then((products) => {
            return res.json({
                error: false,
                products: products
            });
        }).catch(() => {
            return res.status(400).json({
                error: true,
                code: 100,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
        }

    async listOne(req, res) {
        Product.findOne({ _id: req.params.id }, '_id nome marca categoria createAt updateAt').then((Product) => {
            return res.json({
                error: false,
                Product: Product
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 110,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })
    }
    // POST /products

    async create(req, res) {
        // Validação com Yup
        const schema = Yup.object().shape({
            nome: Yup.string()
                .required(),
            marca: Yup.string()
            .required(),
            categoria: Yup.string()
                .required()
        });
        try {
            await schema.validate(req.body);
        } catch(err) {
            return res.status(400).json({
                error: true,
                code: 120,
                message: err.message
            });
        }
        
        Product.create(req.body).then((product) => {
            return res.json({
                error: false,
                message: "Produto cadastrado com sucesso!",
                product
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 122,
                message: "Error: produto não foi cadastrado com sucesso"
            });
        });
    }
    // PUT /products/:id

    async update(req, res) {
        // Validação com Yup
        const schema = Yup.object().shape({
            nome: Yup.string()
                .notOneOf(['']),
            marca: Yup.string()
                .notOneOf(['']),
            categoria: Yup.string()
                .notOneOf([''])
        });
        try {
            await schema.validate(req.body);
        } catch(err) {
            return res.status(400).json({
                error: true,
                code: 130,
                message: err.message
            });
        }
        
        try {

            const produtoExiste = await Product.findOne({_id: req.params.id});
            if(!produtoExiste){
                return res.status(400).json({
                    error: true,
                    code: 132,
                    message: "Erro: produto não encontrado!"
                });
            };
        } catch(err) {
            return res.status(400).json({
                error: true,
                code: 131,
                message: "Erro: produto não encontrado!"
            });
        }
        

        

        Product.updateOne({_id: req.params.id}, req.body).then(() => {
            return res.json({
                error: false,
                message: "produto editado com sucesso!"
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 133,
                message: "Erro: produto não foi editado com sucesso!"
            });
        });
    }
    // DELETE /products/:id
    async delete(req, res) {

        try {

            const produtoExiste = await Product.findOne({_id: req.params.id});
            if(!produtoExiste){
                return res.status(400).json({
                    error: true,
                    code: 140,
                    message: "Erro: produto não encontrado!"
                });
            };
        } catch(err) {
            return res.status(400).json({
                error: true,
                code: 141,
                message: "Erro: produto não encontrado!"
            });
        }

        Product.deleteOne({ _id: req.params.id }).then(() => {
            return res.json({
                error: false,
                message: "produto apagado com sucesso!"
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 142,
                message: "Error: produto não foi apagado com sucesso!"
            });
        });
    }
}

export default new ProductController();