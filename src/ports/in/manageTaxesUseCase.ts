export interface ManageTaxesUseCase {
    getAllTaxes(): JSON;
    getTax(id: JSON): JSON;
    addTax(input: JSON): boolean;
    editTax(item: JSON): boolean;
    deleteTax(id: JSON): boolean;
}