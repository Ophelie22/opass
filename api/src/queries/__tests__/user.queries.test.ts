import { User, PrismaClient } from '@prisma/client';
import { UserQueries } from '../user.queries';

// Crée une instance fictive de PrismaClient
const prisma = new PrismaClient();
const userQueries = new UserQueries(prisma);

describe('UserQueries', () => {
    // Nettoie la base de données avant chaque test
    beforeEach(async () => {
        await prisma.user.deleteMany();
    });

    // Déconnecte Prisma après tous les tests
    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'testuser'
            };

            const user = await userQueries.create(userData);

            expect(user).toBeDefined();
            expect(user.email).toBe(userData.email);
            expect(user.name).toBe(userData.name);
            // le mot de passe ne doit pas être haché
            expect(user.password).not.toBe(userData.password);
        });

        it('should throw error for duplicate email', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'testuser'
            };

            await userQueries.create(userData);
            await expect(userQueries.create(userData)).rejects.toThrow();
        });
    });

    describe('findUserById', () => {
        it('should find user by id', async () => {
            // Crée d'abord un utilisateur
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'testuser'
            };
            const createdUser = await userQueries.create(userData);

            // Puis recherche l'utilisateur par ID
            const foundUser = await userQueries.findUserById(createdUser.id);

            expect(foundUser).toBeDefined();
            expect(foundUser?.id).toBe(createdUser.id);
            expect(foundUser?.email).toBe(userData.email);
        });

        it('should return null for non-existent id', async () => {
            const foundUser = await userQueries.findUserById(999);
            expect(foundUser).toBeNull();
        });
    });
});