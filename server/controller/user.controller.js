const UserModel = require('../model/user.model');
const bcrypt = require("bcryptjs");
const generateToken = require('../helper/generateToken')

class UserController {
    static async getUser(req, res, next) {
        let { email } = req.query;
        let user = await UserModel.findOne({ email: email });
        res.status(200).json(user)
    }
    
    static async register(req, res, next) {
        let { name, email, password } = req.body;
        const newUser = new UserModel({
            name : name,
            email : email,
            password : password
        });
        
        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(newUser.password, salt, (err,hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                return res.json(newUser);
            })
        });
    }

    static async login(req, res, next) {
        let { email, password } = req.body;
        try {
            let user = await UserModel.findOne({ email: email });
            if (user) {
                let validate = await validatePassword(password, user);
                if (validate) {
                    user.token = generateToken(user._id)
                    res.status(200).json(user)
                }
                else res.status(200).json('wrong password')
            } else res.json('user not found')
        } catch (error) {
            res.staus(400).json(error)
        }
    }

    static async update(req, res, next) {
        let { email, password, newPassword } = req.body;
        try {
            let user = await UserModel.findOne({ email: email });
            if (user) {
                let validate = await validatePassword(password, user);
                if (validate) { // update
                    bcrypt.genSalt(10, (err,salt) => {
                        bcrypt.hash(newPassword, salt, async (err,hash) => {
                            if(err) throw err;
                            await UserModel.updateOne({ _id: user._id }, {
                                $set: {
                                    password: hash
                                },
                            })
                            return res.json(newUser);
                        })
                    });
                } else res.status(200).json(null)
            } else res.json(null)
        } catch (error) {
            res.staus(400).json(error)
        }
    }
}

async function validatePassword(password, user) {
    try {
        let compareRes = await bcrypt.compareSync(password, user.password);
        if (compareRes) return user
        else return null
    } catch (error) {
        return null
    }
}

module.exports = UserController;