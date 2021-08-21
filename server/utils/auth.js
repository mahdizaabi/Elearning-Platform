import bcrypt from 'bcrypt';


export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err,salt) => {
            if (err) {
                reject(err)
            } else {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) { reject(err) }
                    else {
                        resolve(hash)
                    }
                })
            }
        })
    })
}


export const comparePassword = (password, hashPassword) => {
     return bcrypt.compare(password, hashPassword);
    
}

