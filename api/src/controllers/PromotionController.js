import Promotion from '../models/Promotion.js'
import PromotionType from '../models/PromotionType.js'
import { createError} from '../utils/error.js'

class PromotionController{
    async getAll(req, res, next){
        try{
            const promotions = await Promotion.find()
        res.status(200).json(promotions)
        } catch(e){
            next(createError(500, 'Promotions not found'))
        }
    }

    async getAllTypes(req, res, next){
        const types = await PromotionType.find()
        res.status(200).json(types)
    }

    async getAllPeriods(req, res, next){
        const promotions = await Promotion.find()
        const periods = promotions.map(p => p.startEndDate)
        res.status(200).json(periods)
    }

    async create(req, res, next){
        try{
            const promotion = new Promotion(req.body)
            await promotion.save()
            console.log(promotion)
            res.json(promotion)
        }catch(e){
            next(e)
        }
    }
}

export default new PromotionController()
