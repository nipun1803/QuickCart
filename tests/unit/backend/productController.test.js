import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../backend/models/Product.js', () => {
    const mockFind = vi.fn();
    const mockCountDocuments = vi.fn();
    const mockFindById = vi.fn();
    const mockCreate = vi.fn();

    return {
        default: {
            find: mockFind,
            countDocuments: mockCountDocuments,
            findById: mockFindById,
            create: mockCreate,
        }
    };
});

import Product from '../../../backend/models/Product.js';
import { getProducts, getProductById, createProduct, deleteProduct } from '../../../backend/controllers/productController.js';

const mockRes = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

describe('Product Controller - Unit Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getProducts', () => {
        it('should return products with pagination', async () => {
            const mockProducts = [
                { _id: '1', title: 'Product A', price: 100 },
                { _id: '2', title: 'Product B', price: 200 },
            ];

            const req = { query: {} };
            const res = mockRes();

            Product.countDocuments.mockResolvedValue(2);
            Product.find.mockReturnValue({
                limit: vi.fn().mockReturnValue({
                    skip: vi.fn().mockReturnValue({
                        sort: vi.fn().mockResolvedValue(mockProducts),
                    }),
                }),
            });

            await getProducts(req, res);

            expect(Product.find).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    products: mockProducts,
                    total: 2,
                })
            );
        });

        it('should apply category filter', async () => {
            const req = { query: { category: 'Electronics' } };
            const res = mockRes();

            Product.countDocuments.mockResolvedValue(1);
            Product.find.mockReturnValue({
                limit: vi.fn().mockReturnValue({
                    skip: vi.fn().mockReturnValue({
                        sort: vi.fn().mockResolvedValue([{ title: 'Phone' }]),
                    }),
                }),
            });

            await getProducts(req, res);

            expect(Product.find).toHaveBeenCalledWith(
                expect.objectContaining({ category: 'Electronics', isActive: true })
            );
        });

        it('should return 500 on error', async () => {
            const req = { query: {} };
            const res = mockRes();

            Product.countDocuments.mockRejectedValue(new Error('DB fail'));

            await getProducts(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'DB fail' });
        });
    });

    describe('getProductById', () => {
        it('should return a product when found', async () => {
            const mockProduct = { _id: '1', title: 'Test Product', price: 50 };
            const req = { params: { id: '1' } };
            const res = mockRes();

            Product.findById.mockResolvedValue(mockProduct);

            await getProductById(req, res);

            expect(Product.findById).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith(mockProduct);
        });

        it('should return 404 when product not found', async () => {
            const req = { params: { id: 'nonexistent' } };
            const res = mockRes();

            Product.findById.mockResolvedValue(null);

            await getProductById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
        });
    });

    describe('createProduct', () => {
        it('should create and return a product with 201', async () => {
            const newProduct = {
                title: 'New Product',
                description: 'Desc',
                price: 99,
                category: 'Books',
                image: 'img.jpg',
                stock: 20,
            };
            const req = { body: newProduct };
            const res = mockRes();

            Product.create.mockResolvedValue({ _id: 'new1', ...newProduct, rating: 0, reviews: 0 });

            await createProduct(req, res);

            expect(Product.create).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({ title: 'New Product' })
            );
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product and return success message', async () => {
            const req = { params: { id: '1' } };
            const res = mockRes();

            Product.findById.mockResolvedValue({
                deleteOne: vi.fn().mockResolvedValue(true),
            });

            await deleteProduct(req, res);

            expect(res.json).toHaveBeenCalledWith({ message: 'Product removed successfully' });
        });

        it('should return 404 when product to delete not found', async () => {
            const req = { params: { id: 'bad' } };
            const res = mockRes();

            Product.findById.mockResolvedValue(null);

            await deleteProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });
});
