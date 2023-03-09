import bcrypt from 'bcrypt';
import RepositoryResponse from '../repository/response.js';


// export async function hashPass(_user){
//     const resp = new RepositoryResponse

//     try {
//         const hash = bcrypt.hashSync(_user.password, 10)
    
//         resp.info = {
//             name: _user.name,
//             email: _user.email,
//             password: hash
//         }
    
//         return resp.continue()
        
//     } catch (err) {
//         return resp.direct(500, err.message)
//     }
// }

export async function checkHash(_pass, _hash){
    const resp = new RepositoryResponse

    try {
        const result = bcrypt.compareSync(_pass, _hash)

        resp.condition = !result
        resp.errCode = 401
        resp.errMessage = "Wrong password/email"
        return resp.byCondition()
        
    } catch (err) {
        return resp.direct(500, err.message)
    }
}
