import db from '../utils/db.js';
import sha1 from 'sha1';

class UsersController {
    static async postNew(req, res) {
        const { email, password } = req.body;

        //if email and passwords are nt provided return log some error
        if(!email) return res.status(400).send('Missing email');
        if(!password) return res.status(400).send('Missing password');

        const userExist = await db.usercollection.findone(email);
        if(userExist) return res.status(400).send('user exist')
    }
}