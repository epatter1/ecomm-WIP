import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

{/* express.Router makes code modular:
    -- instead of having all the routes in server.js
    -- you can define multiple files to have your routers */}
const userRouter = express.Router();

// hashSync in data.js hashes your passwords
userRouter.get(
    '/seed', 
    expressAsyncHandler(async (req, res) => {
    await User.remove({}); {/* remove all users to prevent duplicates */ }
    {/* insert users into collection witin MongoDB */}
    const createdUsers = await User.insertMany(data.users);
    {/* send back createdUsers */}
    res.send({ createdUsers });
})
);
{/* initiating POST request for signin */}
userRouter.post('/signin', expressAsyncHandler(async(req, res) => {
    {/* comparing email in DB with email in body of this request */}
    const user = await User.findOne({email: req.body.email});
    if (user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({message: 'Invalid email or password.'});
})
);

export default userRouter;