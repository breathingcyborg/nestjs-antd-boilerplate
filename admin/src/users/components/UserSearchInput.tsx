import { ProFormSelect, ProFormSelectProps } from "@ant-design/pro-components";
import { useState } from "react";
import useSWR from 'swr';
import { SearchUserRequest } from "../types";
import usersApi from "../api";
import { getUserSelectLabel } from "../utils";

export interface UserSearchInputProps extends ProFormSelectProps {}

export const UserSearchInput = (props : UserSearchInputProps) => {

    const [ searchValue, setSearchValue ] = useState<string | null>(null);

    const {
        data: options,
        isLoading
    } = useSWR(
        !!searchValue ? `/api/users/search?query=${searchValue}` : null,
        async () => {

            const request : SearchUserRequest = {
                query: searchValue || '',
                page: 1,
                perPage: 20,
            }

            const response = await usersApi.searchUsers(request);

            return (response.data || []).map(user => ({
                label: getUserSelectLabel(user),
                value: user.id,
            }))
        }
    );

    return <ProFormSelect
        fieldProps={{
            showSearch: true,
            onSearch: (value) => setSearchValue(value || null),
            loading: isLoading,
            labelInValue: true,
        }}
        options={options}
        {...props}
    />;
}