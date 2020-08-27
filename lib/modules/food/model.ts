import { ModificationNote } from "../common/model";

export interface Foodies {
    _id?: String
    name: String
    description: String
    picture: Object
    is_deleted?: Boolean
    modification_notes: ModificationNote[]
}