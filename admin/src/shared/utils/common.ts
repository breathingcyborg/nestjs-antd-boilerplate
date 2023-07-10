type AntTableParams = {
    pageSize?: number
    current?: number
}

export const getPaginationParams = (antParams: AntTableParams) => {
    return {
        page: antParams.current || 1,
        perPage: antParams.pageSize || 10,
    }
}
