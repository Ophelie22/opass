import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient, User } from '@prisma/client';
import { UserQueries } from '../user.queries';

const prismaMock = mockDeep<PrismaClient>();
const userQueries = new UserQueries(prismaMock as unknown as PrismaClient);

describe('UserQueries', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'testuser'
            };

            const createdUser: User = {
                id: 1,
                ...userData,
                password: await UserQueries.hashPassword(userData.password),
                createAt: new Date(),
                updatedAt: new Date()
            };

            prismaMock.user.create.mockResolvedValue(createdUser);

            const user = await userQueries.create(userData);

            expect(user).toBeDefined();
            expect(user.email).toBe(userData.email);
            expect(user.name).toBe(userData.name);
            expect(user.password).not.toBe(userData.password);
        });

        it('should throw error for duplicate email', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'testuser'
            };

            const error = new Error('A user with this email already exists');
            error.name = 'P2002';
            prismaMock.user.create.mockRejectedValue(error);

            await expect(userQueries.create(userData)).rejects.toThrow('A user with this email already exists');
        });

        it('should throw error if password is too short', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'short',
                name: 'testuser'
            };

            const error = new Error('Password must be at least 8 characters long');
            prismaMock.user.create.mockRejectedValue(error);

            await expect(userQueries.create(userData)).rejects.toThrow('Password must be at least 8 characters long');
        });
    });

    describe('findUserById', () => {
        it('should find user by id', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                name: 'testuser'
            };

            const createdUser: User = {
                id: 1,
                ...userData,
                password: await UserQueries.hashPassword(userData.password),
                createAt: new Date(),
                updatedAt: new Date()
            };

            prismaMock.user.findUnique.mockResolvedValue(createdUser);

            const foundUser = await userQueries.findUserById(createdUser.id);

            expect(foundUser).toBeDefined();
            expect(foundUser?.id).toBe(createdUser.id);
            expect(foundUser?.email).toBe(userData.email);
        });

        it('should return null for non-existent id', async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            const foundUser = await userQueries.findUserById(999);
            expect(foundUser).toBeNull();
        });
    });
});