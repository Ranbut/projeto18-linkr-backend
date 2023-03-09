import { db } from "./database/database.connection.js";

function timeType (timeAs){
    let multiplier
    switch (timeAs.toLowerCase()) {
        case 'seconds': 
            multiplier = 1000
        break;
        case 'minutes': 
            multiplier = 1000*60
        break;
        case 'hours': 
            multiplier = 1000*60*60
        break;
        default:
            multiplier = 1000
        break;
    }

    return multiplier
}


///////////////////////////////////////////////////////////////


export default function sessionRefresh(timeout, times, timeAs){
    const refresh = timeout/times
    const mltp = timeType(timeAs)

    setInterval(() => {
        sessionValidate(timeout*mltp)
     }, refresh*mltp);
}


///////////////////////////////////////////////////////////////


async function sessionValidate(timeout){
    const limitNow = Date.now() - timeout
    try {
        await db.query(`DELETE FROM sessions WHERE "createdAt" < $1`, [limitNow])
    } catch (error) {return console.log(error)}
}