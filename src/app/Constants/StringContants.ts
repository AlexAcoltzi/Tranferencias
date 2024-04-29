
export enum StringConstants {
    Empty = ''
}

export enum PathModel {
    default = '',
    home = 'home',
    transfer = 'transfer'
}

export enum Numbers {
    zero = 0,
    one = 1
}

export enum PathRequest {
    login = 'http://localhost:9200/loginRedSinergia/login-user',
    getAccounts = 'http://localhost:9300/Accounts/getAccounts',
    getTransfers = 'http://localhost:9300/transfers/getTransfers',
    setTransfer = 'http://localhost:9300/transfers/setTransfers'
}
