import Core from "src/core/model"
import { matchersWithOptions } from 'jest-json-schema';
import { JSONSchema7 } from "json-schema";
import { SCHEMAS, setFormats } from 'src/utils/configAjv';

expect.extend(matchersWithOptions(SCHEMAS, (ajv) => setFormats(ajv)));

let model = Core.createModelMock();

const TAX_SCHEMA: JSONSchema7 = {
    $ref: "schemas/taxes.json#/tax"
};
const TAXES_SCHEMA: JSONSchema7 = {
    $ref: "schemas/taxes.json#/taxes"
};

test('schema', () => {
    expect(TAX_SCHEMA).toBeValidSchema();
    expect(TAXES_SCHEMA).toBeValidSchema();
});

test('getTax', async () => {
    const RES = await model.getTax("1");
    expect(RES).toMatchSchema(TAX_SCHEMA);
});

test('getTaxes', async () => {
    const RES = await model.getTaxes();
    expect(RES).toMatchSchema(TAXES_SCHEMA);
});

test('createTax', async () => {
    const RES = await model.createTax({ value: 75.75, description: "tassa folle" }, "token");
    expect(RES).toBe(true);
});

test('error createTax', async () => {
    await expect(model.createTax(null, "token"))
        .rejects.toThrow(Error);
    await expect(model.createTax({ description: "tassa folle" }, "token"))
        .rejects.toThrow(Error);
});

test('error createTax no token', async () => {
    await expect(model.createTax({ value: 55, description: "descrizione" }, null))
        .rejects.toThrow(Error);
});

test('updateTax', async () => {
    let res = await model.updateTax("1", { description: "modifica descrizione" }, "token");
    expect(res).toBe(true);
    res = await model.updateTax("1", { value: 75.75 }, "token");
    expect(res).toBe(true);
    res = await model.updateTax("1", { value: 75.75, description: "tassa folle" }, "token");
    expect(res).toBe(true);
});

test('error updateTax', async () => {
    await expect(model.updateTax(null, null, "token"))
        .rejects.toThrow(Error);
    await expect(model.updateTax("1", null, "token"))
        .rejects.toThrow(Error);
    await expect(model.updateTax(null, { value: 75.75, description: "tassa folle" }, "token"))
        .rejects.toThrow(Error);
    await expect(model.updateTax("1", { value: "75.75", description: "tassa folle" }, "token"))
        .rejects.toThrow(Error);
    await expect(model.updateTax("1", { ciao: "ciao" }, "token"))
        .rejects.toThrow(Error);
});

test('error updateTax no token', async () => {
    await expect(model.updateTax("1", { value: 75.75, description: "tassa folle" }, null))
        .rejects.toThrow(Error);
});

test('deleteTax', async () => {
    let res = await model.deleteTax("1", "token");
    expect(res).toBe(true);
});

test('error deleteTax', async () => {
    let res = await model.deleteTax(null, "token");
    expect(res).toBe(false);
});

test('error deleteTax no token', async () => {
    await expect(model.deleteTax("1", null))
        .rejects.toThrow(Error);
});