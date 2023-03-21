import axios from "axios";
import dotenv from "dotenv";
import joi from "joi";

dotenv.config();
const { API_URI } = process.env;

const productSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
});

export const getAll = async (req, res) => {
  try {
    const { data: products } = await axios.get(`${API_URI}/products`);
    if (products.length === 0) {
      return res.json({
        message: "No product",
      });
    }
    return res.json(products);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async function (req, res) {
  try {
    const { data: product } = await axios.get(
      `${API_URI}/products/${req.params.id}`
    );
    if (!product) {
      return res.json({
        message: "No product",
      });
    }
    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const remove = async function (req, res) {
  try {
    await axios.delete(`${API_URI}/products/${req.params.id}`);
    res.json({
      message: "Remove successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const add = async function (req, res) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const { data: product } = await axios.post(`${API_URI}/products`, req.body);
    if (!product) {
      return res.json({
        message: "Cant add product",
      });
    }
    return res.json({
      message: "Add successfully",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const update = async function (req, res) {
  try {
    const { data: product } = await axios.patch(
      `${API_URI}/products/${req.params.id}`,
      req.body
    );
    if (!product) {
      return res.json({
        message: "Cant update product",
      });
    }
    return res.json({
      message: "Update successfully",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
