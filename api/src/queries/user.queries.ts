/// TODO CREER UN MODEL USER PPOUR LES QUERIES
import { PrismaClient } from '@prisma/client';
import { User } from '../models/user.model';
import { UserCreate } from '../models/userCreate.model';

const prisma = new PrismaClient();

export class UserQueries {
    static async create(user: UserCreate): Promise<User> {
        return prisma.user.create({ data: user });
    }
}
// Methode pour la hshage du mot de passe
const prisma = require('@prisma/client').PrismaClient;// Vérification si l'utilisateur déjà existant
const bcrypt = require('bcrypt');
const schema = prisma.Schema;


const userSchema = schema({
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String },
  },
  username: String
});


userSchema.statics.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch(e) {
    throw e
  }
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.local.password);
}
exports.findUserPerId = (id) => {
    return User.findOne({ _id: id }).exec();
  }


const User = prisma.model('user', userSchema);

module.exports = User;