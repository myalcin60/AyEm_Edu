
import connection from "../config/db.js";
import bcrypt from 'bcryptjs';

const save = async(user) => {    
    const saltRounds = 10;
    const password = await bcrypt.hash(user.password, saltRounds);
    try {
        const INSERT = "INSERT INTO users (id, lastName, firstName, email, password, role) values (null, ?, ?, ?,?,?)"
        const resultat = await connection.query(INSERT, [user.nom.trim(), user.prenom.trim(), user.email.trim(), password, user.role]);
        user.id = resultat[0].insertId
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const findByEmail =async(email)=>{
    try {
        const SELECT = "SELECT * FROM users WHERE email = ?"
        const [user] = await connection.query(SELECT, [email]);
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default { findByEmail,save };