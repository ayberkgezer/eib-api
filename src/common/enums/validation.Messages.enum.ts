export enum DtoPrefix {
    input_messages = 'MESSAGE',
}

export enum ValidationType {
    IS_NOT_EMPTY = 'IS_NOT_EMPTY',
    MUST_BE_STRING = 'MUST_BE_STRING',
    MAX_LENGTH = 'MAX_LENGTH',
    MIN_LENGTH = 'MIN_LENGTH',
    IS_DEFINED = 'IS_DEFINED',
}

export function getValidationMessage(prefix: DtoPrefix, validationType: ValidationType, ...arg: any) {
    const message = `${prefix}_${validationType}_${arg.length > 0 ? arg.join('_') : ''}`;
    return message;
}