export class Tax {
    private readonly id: string;
    private readonly value: number;
    private readonly description: string;
    
    constructor (id: string, value: number, description: string){
        this.id = id;
        this.value = value;
        this.description = description;
    }
}