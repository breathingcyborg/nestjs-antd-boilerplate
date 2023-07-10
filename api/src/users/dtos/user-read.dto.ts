import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserRead {
    @Expose()
    id: string

    @Expose()
    email?: string

    @Expose()
    displayName?: string
}