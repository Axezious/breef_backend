export interface ModificationNote {
    modified_on: Date;
}

export const ModificationNote = {
    modified_on: Date
}

export enum response_status_codes {
    success = 200,
    created = 201,
    bad_request = 400,
    not_found = 404,
    internal_server_error = 500
}