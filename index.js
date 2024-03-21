// index.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Функция для регистрации нового пользователя
async function registerUser(username, password) {
    try {
        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);
        // Здесь может быть ваша логика для сохранения информации о пользователе в базе данных
        console.log('User registered successfully');
        return { success: true };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, error: error.message };
    }
}

// Функция для аутентификации пользователя
async function authenticateUser(username, password) {
    try {
        // Здесь может быть ваша логика для получения информации о пользователе из базы данных
        const user = { username: 'example', hashedPassword: '$2b$10$Q56SbRV6I7uET6f96E28u.vLOk2/GDXd9cLs6.Cn4IMcL5Cz2Aox6' };
        
        // Сравниваем введенный пароль с хешированным паролем пользователя
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
        if (passwordMatch) {
            // Если пароль совпадает, генерируем JWT-токен и возвращаем его
            const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
            console.log('User authenticated successfully');
            return { success: true, token: token };
        } else {
            console.log('Invalid credentials');
            return { success: false, error: 'Invalid credentials' };
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    registerUser: registerUser,
    authenticateUser: authenticateUser
};
