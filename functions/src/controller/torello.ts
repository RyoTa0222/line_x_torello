import { Request, Response } from 'express'
// import {torelloActionType} from '../../const/types'
import {
    nortifyCreateCard,
    nortifyUpdateCard,
    nortifyDeleteCard,
    nortifyCopyCard,
    nortifyCommentCard,
    nortifyAddLabelToCard,
    nortifyRemoveLabelToCard
} from '../model/torello'
/**
 * リクエストのタイプによって呼び出す関数を指定する
 * @param {Request} req webhookで渡ってきたリクエスト
 * @param {Response} res レスポンス
 */
export const torelloEventRouter = (req: Request, res: Response) => {
    const {action = {}, model} = req.body
    if (action) {
        const {type = null} = action
        // console.log(`method: ${req.method}`)
        // console.log(`type: ${req.body.action.type as torelloActionType}`)
        switch(type) {
            case 'createCard':
                nortifyCreateCard(action, model)
                break
            case 'updateCard':
                nortifyUpdateCard(action, model)
                break
            case 'deleteCard':
                nortifyDeleteCard(action, model)
                break
            case 'copyCard':
                nortifyCopyCard(action, model)
                break
            case 'commentCard':
                nortifyCommentCard(action, model)
                break
            case 'addLabelToCard':
                nortifyAddLabelToCard(action, model)
                break
            case 'removeLabelFromCard':
                nortifyRemoveLabelToCard(action, model)
                break
            default:
                break
        }
    }
    res.status(200).send('success')
}
