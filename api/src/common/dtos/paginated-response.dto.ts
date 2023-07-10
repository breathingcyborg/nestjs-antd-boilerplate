export class PaginatedResponse<T> {

    constructor(args: {
        data?: T[];
        success?: boolean;
        total?: number;
    }) {
        this.data = args.data;
        this.success = args.success;
        this.total = args.total;
    }

    data?: T[]

    success?: boolean

    total?: number
}