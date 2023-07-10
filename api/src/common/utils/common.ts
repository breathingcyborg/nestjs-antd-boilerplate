import { SortOrder } from "../enums/sort-order.enum";

export const toTypeormSortOrder = (sortOrder : SortOrder) : 'ASC' | 'DESC' => {
    const map : Record<SortOrder, 'ASC' | 'DESC'> = {
        [SortOrder.Ascending]: 'ASC',
        [SortOrder.Descendig]: 'DESC'
    };
    return map[sortOrder]
}
