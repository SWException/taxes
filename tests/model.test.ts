import Core from "src/core/model"
import { matchersWithOptions } from 'jest-json-schema';
import { JSONSchema7 } from "json-schema";
import { SCHEMAS, setFormats } from 'tests/configAjv';

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
    const RES = await model.createTax(75.75, "tassa folle", "token");
    expect(RES).toBe(true);
});

test('error createTax', async () => {
    const RES = await model.createTax(null, null, "token");
    expect(RES).toBe(false);
});

test('error createTax no token', async () => {
    function test(){
        return model.createTax(55, "descrizione", null);
    }
    await expect(test).rejects.toThrow(Error);
});

test('updateTax', async () => {
    let res = await model.updateTax("token", "1", null, "modifica descrizione");
    expect(res).toBe(true);
    res = await model.updateTax("token", "1", 75.75);
    expect(res).toBe(true);
    res = await model.updateTax("token", "1", 75.75, null);
    expect(res).toBe(true);
    res = await model.updateTax("token", "1", 75.75, "tassa folle");
    expect(res).toBe(true);
});

test('error updateTax', async () => {
    let res = await model.updateTax("token", null);
    expect(res).toBe(false);
    res = await model.updateTax("token", null, null);
    expect(res).toBe(false);
});

test('error updateTax no token', async () => {
    function test(){
        return model.updateTax(null, "descrizione", 55);
    }
    await expect(test).rejects.toThrow(Error);
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
    function test(){
        return model.deleteTax("1", null);
    }
    await expect(test).rejects.toThrow(Error);
});