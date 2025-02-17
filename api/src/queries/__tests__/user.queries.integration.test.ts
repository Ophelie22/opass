import { PrismaClient } from '@prisma/client';
import { UserQueries } from '../user.queries';

const prisma = new PrismaClient();
const userQueries = new UserQueries(prisma);

beforeAll(async () => {
    await prisma.$connect();
    await prisma.user.deleteMany(); // Nettoyage avant les tests
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe('UserQueries Integration Tests', () => {
    it('should create a user in the database', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'password123',
            name: 'testuser'
        };

        const user = await userQueries.create(userData);

        expect(user).toBeDefined();
        expect(user.email).toBe(userData.email);

        // Vérifier qu'il est bien en base
        const foundUser = await prisma.user.findUnique({ where: { email: userData.email } });
        expect(foundUser).not.toBeNull();
    });

    it('should return null for non-existent user', async () => {
        const user = await userQueries.findUserById(999);
        expect(user).toBeNull();
    });
});
