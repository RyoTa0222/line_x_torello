export type torelloActionType = 'createCard' | 'updateCard' | 'deleteCard' | 'copyCard' | 'commentCard' | 'addLabelToCard' | 'removeLabelFromCard'

export type torelloActionObject = {
    display: object,
    memberCreator: torelloMemberCreator,
    id: string,
    date: string,
    type: string,
    limits: object,
    data: torelloDataObject,
    idMemberCreator: string,
    appCreator: string | null
}

export type torelloDataObject = {
    old: torelloOldObject,
    list: torelloListObject,
    card: torelloCardObject,
    board: torelloBoardObject,
    text?: string,
    label?: torelloLabelObject,
    listBefore?: torelloListObject,
    listAfter?: torelloListObject,
}

export type torelloLabelObject = {
    id: string,
    name?: string,
    color?: string,
}

export type torelloOldObject = {
    id?: string,
    name?: string,
    desc?: string,
    closed?: boolean,
    idList?: string
}

export type torelloCardObject = {
    id: string,
    name?: string,
    idShort?: number,
    shortLink?: string,
    desc?: string,
    closed?: boolean,
}

export type torelloListObject = {
    id: string,
    name: string
}

export type torelloBoardObject = {
    id: string,
    name: string,
    idShort?: number,
    shortLink?: string
}

export type torelloMemberCreator = {
    fullName: string,
    id: string,
    activityBlocked?: boolean,
    avatarUrl?: string,
    idMemberReferrer?: string,
    initials?: string,
    username?: string,
    nonPublicAvailable?: boolean,
    nonPublic?: object,
    avatarHash?: string
}

export type torelloModelObject = {
    descData?: unknown,
    id: string,
    idOrganization?: string,
    name: string,
    closed?: boolean,
    idEnterprise?: unknown,
    prefs?: object,
    url: string,
    labelNames?: object,
    desc?: string,
    shortUrl?: string,
    pinned?: boolean
}
