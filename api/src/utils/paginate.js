function paginate(model, perPage = 12) {
    return async (req, res, next) => {
        // Paginate
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let { q } = req.query;
        let otherSearchProperties = {
            type: req.query?.type?.split(','),
            brand: req.query?.brand?.split(','),
        }
        let queries = {}
        if (otherSearchProperties.type && otherSearchProperties.type[0] !== '') queries.type = {
            '$in': otherSearchProperties.type
        }
        if (otherSearchProperties.brand && otherSearchProperties.brand[0] !== '') queries.brand = {
            '$in': otherSearchProperties.brand
        }

        if (isNaN(page)) page = 1;
        if (isNaN(limit)) limit = perPage;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit

        const result = {}
        const pageCount = await model.countDocuments()
        result.pages = Math.ceil(pageCount / limit)
        result.offset = 2; // Số trang hiển thị trước và sau trang hiện tại
        result.currentPage = {
            page,
            limit,
            startOffset: page - result.offset >= 1 ? page - result.offset : 1,
            endOffset: page + result.offset <= result.pages ? page + result.offset : result.pages
        }

        // Lưu trữ thông tin cho trang tiếp theo
        if (endIndex < pageCount) {
            result.next = {
                page: page + 1,
                limit,
            }
        }


        // Lưu trữ thông tin cho trang trước đó
        if (startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit,
            }
        }

        try {
            //Search
            if (q && q !== '') {
                console.log(q)
                if (Object.keys(queries).length > 0) {
                    console.log('ok')
                    result.data = await model.find({
                        name: { $regex: new RegExp(q, 'i') },
                        ...queries
                    }).limit(limit).skip(startIndex)
                }
                else {
                    result.data = await model.find({
                        name: { $regex: new RegExp(q, 'i') },
                    }).limit(limit).skip(startIndex)
                }
                result.q = q
            }
            else if (Object.keys(queries).length > 0) {
                result.data = await model.find({
                    ...queries
                }).limit(limit).skip(startIndex)
            }
            else result.data = await model.find().limit(limit).skip(startIndex)
            if ((q && q !== '') || Object.keys(queries).length > 0) {
                console.log('fasdfasfsa')
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