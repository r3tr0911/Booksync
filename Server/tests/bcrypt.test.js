const bcrypt = require('bcryptjs');

describe('Pruebas de bcrypt', () => {
    test('debe encriptar una contraseña y validarla correctamente', async () => {
        const password = '123456';
        const hash = await bcrypt.hash(password, 10);

        const isMatch = await bcrypt.compare(password, hash);

        expect(isMatch).toBe(true);
    });

    test('no debe validar una contraseña incorrecta', async () => {
        const password = '123456';
        const wrongPassword = '654321';
        const hash = await bcrypt.hash(password, 10);

        const isMatch = await bcrypt.compare(wrongPassword, hash);

        expect(isMatch).toBe(false);
    });
});