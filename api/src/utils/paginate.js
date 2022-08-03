function paginate(model, perPage = 12) {
    return async (req, res, next) => {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let { q } = req.query;

        let searchProperties = {
            type: req.query?.type?.split(','),
            brand: req.query?.brand?.split(','),
            minprice: Number(req.query?.minprice),
            maxprice: Number(req.query?.maxprice),
            sort: req.query?.sort ?? 'default'
        }

        let queries = {}
        let priceRange = {}
        let sortMethod = {}

        if (searchProperties.type && searchProperties.type[0] !== '') queries.type = {
            '$in': searchProperties.type
        }
        if (searchProperties.brand && searchProperties.brand[0] !== '') queries.brand = {
            '$in': searchProperties.brand
        }
        if (!isNaN(searchProperties.minprice)) priceRange.minprice = searchProperties.minprice
        if (!isNaN(searchProperties.maxprice)) priceRange.maxprice = searchProperties.maxprice

        switch (searchProperties.sort) {
            case 'price-asc':
                sortMethod = { price: 'asc' }
                break
            case 'price-desc':
                sortMethod = { price: 'desc' }
                break
            default:
                sortMethod = {}
        }

        // Backup
        if (isNaN(page)) page = 1;
        if (isNaN(limit)) limit = perPage;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit

        const result = {}
        const pageCount = await model.countDocuments()
        result.pages = Math.ceil(pageCount / limit)
        result.offset = 2
        result.limit = limit
        result.currentPage = page

        try {
            //Search
            if (q && q !== '') {
                // Search name & Query type, brand, price, ...
                if (Object.keys(queries).length > 0) {
                    result.data = await model.find({
                        name: { $regex: new RegExp(q, 'i') },
                        ...queries,
                        $and: [
                            { price: { $gte: priceRange.minprice } },
                            { price: { $lte: priceRange.maxprice } },
                        ]
                    }).sort(sortMethod).limit(limit).skip(startIndex)
                }

                // Only Search name
                else {
                    result.data = await model.find({
                        name: { $regex: new RegExp(q, 'i') },
                        $and: [
                            { price: { $gte: priceRange.minprice } },
                            { price: { $lte: priceRange.maxprice } },
                        ]
                    }).sort(sortMethod).limit(limit).skip(startIndex)
                }
                result.q = q
            }

            // Only Query type, brand, price, ...
            else if (Object.keys(queries).length > 0) {
                result.data = await model.find({
                    ...queries,
                    $and: [
                        { price: { $gte: priceRange.minprice } },
                        { price: { $lte: priceRange.maxprice } },
                    ]
                }).sort(sortMethod).limit(limit).skip(startIndex)
            }
            // Only Query price
            else if (Object.keys(priceRange).length > 0) result.data = await model.find({
                $and: [
                    { price: { $gte: priceRange.minprice } },
                    { price: { $lte: priceRange.maxprice } },
                ]
            }).sort(sortMethod).limit(limit).skip(startIndex)

            // No filter
            else result.data = await model.find().limit(limit).skip(startIndex)

            if ((q && q !== '') || Object.keys(queries).length > 0) {
                result.pages = Math.ceil(result.data.length / limit) // Tổng số trang sau khi phân trang
            }

            res.paginatedResult = result
            next()
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}

export default paginate