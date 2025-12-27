import Ajv from "ajv/dist/2020";
import schema from "../../schemas/sof.v5.json";

const ajv = new Ajv({
  allErrors: true,
  strict: true
});

export const validateSOF = ajv.compile(schema);
