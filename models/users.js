import { v4 as uuidv4 } from 'uuid'
export const getUsers = async (db) => {
    const [users] = await db.query('select * from users');
    return users
}
export const getUserByEmail = async (db, email) => {
    const [users] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    return users[0]
}

export const doLogin = async (db, email, password) => {

    const [users] = await db.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
    );

    return users[0]
}

export const addNewUser = async (db, newUser) => {
    const { fName, mName, lName, email, password, dob, hobby, gender, address, role } = newUser
    return await db.query('INSERT INTO users values (?,?,?,?,?,?,?,?,?,?,?,?,?)', [
        uuidv4(),
        fName,
        mName,
        lName,
        email,
        password,
        dob,
        hobby.join(),
        gender,
        address,
        role,
        new Date(),
        new Date()
    ], { return: true })
}

export const addLoginLogs = async (db, newUser) => {
    const { fName, mName, lName, email, password, dob, hobby, gender, address, role } = newUser
    return await db.query('INSERT INTO users values (?,?,?,?,?,?,?,?,?,?,?,?,?)', [
        uuidv4(),
        fName,
        mName,
        lName,
        email,
        password,
        dob,
        hobby.join(),
        gender,
        address,
        role,
        new Date(),
        new Date()
    ], { return: true })
}

export const addImage = async (db, newImage, user) => {
    const { title, description, post_Photo_id } = newImage

    return await db.query('INSERT INTO posts values (?,?,?,?,?,?,?)', [
        uuidv4(),
        user,
        title,
        description,
        post_Photo_id,
        new Date(),
        new Date()
    ], { return: true })
}