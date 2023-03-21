import axios from "axios";
import dotenv from "dotenv";
import joi from "joi";

const loginSchema = joi.object({
  name: joi.string().required(),
  password: joi.string().required(),
});
