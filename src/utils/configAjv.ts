import response from 'schemas/response.json';
import taxes from 'schemas/taxes.json';
import { JSONSchema7 } from 'json-schema';
import Ajv from 'ajv';

export const SCHEMAS = {
    schemas: [response as JSONSchema7, taxes as JSONSchema7],
    strict: false
};

export function setFormats(ajv): void {
    ajv.addFormat("float", {
        type: "number",
        validate: /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/
    });

    ajv.addFormat("int64", { type: "number", validate: /^\d+$/ });
    ajv.addFormat("uri", { type: "string", validate: /.*/ });
}

export function buildAjv (): Ajv {
    const AJV: Ajv = new Ajv(SCHEMAS);
    setFormats(AJV);
    return AJV;
}
