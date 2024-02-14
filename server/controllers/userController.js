const connection = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateToken(userId, login, role) {
    return jwt.sign({ id: userId, login: login, role: role }, process.env.SECRET_KEY, { expiresIn: '1h' });
}


class userController {

    async registration(req, res){
        const { name, login, password } = req.body;

        if(!name || !login || !password){
            return res.json({message: 'Неккоректные данные'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.query('INSERT INTO user (name, login, password, role_id) VALUES (?, ?, ?, ?)', [name, login, hashedPassword, 3], (err, result) => {

            if (err) {
                res.json({ message: 'Пользователь существует' });
            } else {
                const userId = result.insertId;

                connection.query('SELECT role_name FROM role WHERE id = ?', [3], (err, roleResult) => {
                    if (err) {
                        res.json({ message: 'Ошибка при получении роли' });
                    } else {
                        const role = roleResult[0].role_name;

                        const token = generateToken(userId, login, role);
                        res.json({ message: 'Пользователь зарегестрирован', token: token })
                    }
                })
            }
        })
        
    }

    async login(req, res){
        const { login, password } = req.body;

        connection.query('SELECT user.id, user.name, user.login, role.role_name, user.password FROM user INNER JOIN role ON user.role_id = role.id WHERE user.login = ?', [login], async (err, results) => {

            if (err) {
                return res.json({ message: 'Ошибка при поиске пользователя' })
            } else {
                if (results.length > 0) {

                    const user = results[0]

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if (passwordMatch || user.password === password) {

                        const role = user.role_name

                        const token = generateToken(user.id, user.login, role)
                        return res.json({ message: 'Успешная авторизация', user: { id: user.id, name: user.name, login: user.login, role: role }, token: token })

                    } else {
                        return res.json({ message: 'Неверный логин/пароль' })
                    }
                } else {
                    return res.json({ message: 'Пользователь не найден' })
                }
            }
        });
    }

}

module.exports = new userController()