import axios from 'axios'
import {config} from '../../const/config'
import {torelloActionObject, torelloModelObject} from '../../const/types'
const querystring = require('querystring')

/**
 * カードが作成されたことを通知する
 * @param {string} message LINEに送信する内容
 */
const sendNotificationToLine = (message: string) => {
    axios(
        {
            method: 'post',
            url: 'https://notify-api.line.me/api/notify',
            headers: {
                Authorization: `Bearer ${config.line.nortifytoken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: querystring.stringify({
                message
            })
        }
    )
    .catch( (err) => {
        console.log(err)
    });
}

/**
 * カードが作成されたことを通知する
 * @param {object} action webhookで渡ってきたaction
 * @param {object} model webhookで渡ってきたmodel
 */
export const nortifyCreateCard = (action: torelloActionObject, model: torelloModelObject) => {
    const {memberCreator, data} = action
    const {url} = model
    let message: string = '\n'
    if (memberCreator) {
        message += `${memberCreator.fullName}さんがカードを作成しました。\n`
    }
    message += '---------\n'
    if (data && 'board' in data) {
        message += `ボード名：${data.board.name}\n`
    }
    if (data && 'list' in data) {
        message += `リスト名：${data.list.name}\n`
    }
    if (data && 'card' in data) {
        message += `カード名：${data.card.name}\n`
    }
    if (url) {
        message += url
    }
    sendNotificationToLine(message)
}

/**
 * カードが更新されたことを通知する
 * @param {object} action webhookで渡ってきたaction
 * @param {object} model webhookで渡ってきたmodel
 */
export const nortifyUpdateCard = (action: torelloActionObject, model: torelloModelObject) => {
    const {memberCreator, data} = action
    const {url} = model
    let message: string = '\n'
    if (memberCreator) {
        message += `${memberCreator.fullName}さんがカードを更新しました。\n`
    }
    if (data) {
        message += `変更内容：\n`
        const {old} = data
        if (old.name) {
            const {name: newName} = data.card
            message += `- タイトルの変更：`
            message += `「${old.name}」→「${newName}」\n`
        }
        if (old.desc) {
            const {desc: newDesc} = data.card
            message += `- 概要の変更：`
            message += `「${old.desc}」→「${newDesc}」\n`
        }
        if (typeof old.closed === 'boolean') {
            const {closed: newClosed} = data.card
            if (newClosed) message += `- アーカイブに追加しました。\n`
            else if (!newClosed) message += `- アーカイブから削除しました。\n`
        }
        if (old.idList) {
            const {listBefore, listAfter} = data
            if (listBefore && listAfter) {
                message += `- 「${listBefore.name}」から「${listAfter.name}」にリストを移動しました。\n`
            }
        }
    }
    message += '---------\n'
    if (data && 'board' in data) {
        message += `ボード名：${data.board.name}\n`
    }
    if (data && 'list' in data) {
        message += `リスト名：${data.list.name}\n`
    }
    if (data && 'card' in data) {
        message += `カード名：${data.card.name}\n`
    }
    if (url) {
        message += url
    }
    // console.log(JSON.stringify(action))
    sendNotificationToLine(message)
}

/**
 * カードが削除されたことを通知する
 * @param {object} action webhookで渡ってきたaction
 * @param {object} model webhookで渡ってきたmodel
 */
export const nortifyDeleteCard = (action: torelloActionObject, model: torelloModelObject) => {
    const {memberCreator, data} = action
    const {url} = model
    let message: string = '\n'
    if (memberCreator) {
        message += `${memberCreator.fullName}さんがカードを削除しました。\n`
    }
    message += '---------\n'
    if (data && 'board' in data) {
        message += `ボード名：${data.board.name}\n`
    }
    if (data && 'list' in data) {
        message += `リスト名：${data.list.name}\n`
    }
    if (data && 'card' in data && data.card.name) {
        message += `カード名：${data.card.name}\n`
    }
    if (url) {
        message += url
    }
    // console.log(JSON.stringify(action))
    sendNotificationToLine(message)
}

/**
 * カードがコピーされたことを通知する
 * @param {object} action webhookで渡ってきたaction
 * @param {object} model webhookで渡ってきたmodel
 */
export const nortifyCopyCard = (action: torelloActionObject, model: torelloModelObject) => {
    const {memberCreator, data} = action
    const {url} = model
    let message: string = '\n'
    if (memberCreator) {
        message += `${memberCreator.fullName}さんがカードをコピーしました。\n`
    }
    message += '---------\n'
    if (data && 'board' in data) {
        message += `ボード名：${data.board.name}\n`
    }
    if (data && 'list' in data) {
        message += `リスト名：${data.list.name}\n`
    }
    if (data && 'card' in data) {
        message += `カード名：${data.card.name}\n`
    }
    if (url) {
        message += url
    }
    sendNotificationToLine(message)
}

/**
 * カードにコメントされたことを通知する
 * @param {object} action webhookで渡ってきたaction
 * @param {object} model webhookで渡ってきたmodel
 */
export const nortifyCommentCard = (action: torelloActionObject, model: torelloModelObject) => {
    const {memberCreator, data} = action
    const {url} = model
    let message: string = '\n'
    if (memberCreator) {
        message += `${memberCreator.fullName}さんがカードにコメントをしました。\n`
    }
    if (data.text) {
        message += `コメント：${data.text}\n`
    }
    message += '---------\n'
    if (data && 'board' in data) {
        message += `ボード名：${data.board.name}\n`
    }
    if (data && 'list' in data) {
        message += `リスト名：${data.list.name}\n`
    }
    if (data && 'card' in data) {
        message += `カード名：${data.card.name}\n`
    }
    if (url) {
        message += url
    }
    sendNotificationToLine(message)
}

/**
 * カードにラベルが追加されたことを通知する
 * @param {object} action webhookで渡ってきたaction
 * @param {object} model webhookで渡ってきたmodel
 */
export const nortifyAddLabelToCard = (action: torelloActionObject, model: torelloModelObject) => {
    const {memberCreator, data} = action
    const {url} = model
    let message: string = '\n'
    if (memberCreator) {
        message += `${memberCreator.fullName}さんがカードにラベルを追加しました。\n`
    }
    if (data.label) {
        message += `追加したラベル：${data.label.name}\n`
    }
    message += '---------\n'
    if (data && 'board' in data) {
        message += `ボード名：${data.board.name}\n`
    }
    if (data && 'list' in data) {
        message += `リスト名：${data.list.name}\n`
    }
    if (data && 'card' in data) {
        message += `カード名：${data.card.name}\n`
    }
    if (url) {
        message += url
    }
    sendNotificationToLine(message)
}

/**
 * カードのラベルが削除されたことを通知する
 * @param {object} action webhookで渡ってきたaction
 * @param {object} model webhookで渡ってきたmodel
 */
export const nortifyRemoveLabelToCard = (action: torelloActionObject, model: torelloModelObject) => {
    const {memberCreator, data} = action
    const {url} = model
    let message: string = '\n'
    if (memberCreator) {
        message += `${memberCreator.fullName}さんがカードのラベルを削除しました。\n`
    }
    if (data.label) {
        message += `削除したラベル：${data.label.name}\n`
    }
    message += '---------\n'
    if (data && 'board' in data) {
        message += `ボード名：${data.board.name}\n`
    }
    if (data && 'list' in data) {
        message += `リスト名：${data.list.name}\n`
    }
    if (data && 'card' in data) {
        message += `カード名：${data.card.name}\n`
    }
    if (url) {
        message += url
    }
    sendNotificationToLine(message)
}
