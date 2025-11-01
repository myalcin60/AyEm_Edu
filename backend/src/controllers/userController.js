import userRepository from "../repositories/userRepository.js";
import bcrypt from 'bcryptjs';
const signup = async (req, res, next) => {
    try {
        const user = req.body;
        if (!user.nom?.trim() || !user.email?.trim() || !user.password) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }
        const newUser = await userRepository.save(user)
        if (!newUser) {
            return res.status(400).json({ message: "Insertion problem" });
        } else {
          return res.status(201).json({
                message: "User created successfully",
                user: newUser
            });
        }
    }
    catch (erreur) {
        console.log(erreur);
        return res.status(500).json({ message: 'Server error during login' });
    }
}

const login = async (req, res, next) => {
    try {
        const user = await userRepository.findByEmail(req.body.email);
        if (!user || user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!(await bcrypt.compare(req.body.password, user[0].password))) {
            return res.status(401).json({ message: 'Invalid password' });
        }        
        return res.status(200).json({
            message: 'Login successful',
            user: JSON.parse(JSON.stringify(user[0]))
            
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error during login' });
    }

}

const allUsers =async(req, res)=>{
    try {
        const users= await userRepository.allUsers();
        res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ error:error.message });
    }
}

export default { login, signup,allUsers };