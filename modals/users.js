import { v4 as uuidv4 } from 'uuid'
export const getUsers = async (db) => {
    const [users] = await db.query('select * from users');
    return users
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