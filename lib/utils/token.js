module.exports = {
    getToken (headers) {
        if (headers && headers.authorization) {
            const parted = headers.authorization.split(' ')
            if (parted.length === 2) {
                console.log(parted[1])
                return parted[1]
            } else {
                return null
            }
        } else {
            return null
        }
    }
}