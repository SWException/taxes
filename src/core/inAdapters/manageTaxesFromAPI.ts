import { ManageTaxesUseCase } from "src/ports/in/manageTaxesUseCase";
import { Persistence } from "src/ports/out/persistence"

class ManageTaxesFromAPI implements ManageTaxesUseCase {
    getAllTaxes (): JSON {
        return null;
    }
    getTax (id: JSON): JSON {
        throw new Error("Method not implemented.");
    }
    addTax (input: JSON): boolean {
        throw new Error("Method not implemented.");
    }
    editTax (item: JSON): boolean {
        throw new Error("Method not implemented.");
    }
    deleteTax (id: JSON): boolean {
        throw new Error("Method not implemented.");
    }

}