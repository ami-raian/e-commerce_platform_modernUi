import { z } from 'zod'

// Product creation validation schema - matches backend Joi schema
export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(200, 'Product name cannot exceed 200 characters')
    .trim(),

  description: z
    .string()
    .min(1, 'Product description is required')
    .max(2000, 'Description cannot exceed 2000 characters')
    .trim(),

  mainPrice: z
    .number({
      required_error: 'Original price is required',
      invalid_type_error: 'Original price must be a number',
    })
    .min(0, 'Original price cannot be negative'),

  price: z
    .number({
      required_error: 'Selling price is required',
      invalid_type_error: 'Selling price must be a number',
    })
    .min(0, 'Selling price cannot be negative'),

  category: z.enum(['electronics', 'fashion', 'beauty', 'accessories', 'home'], {
    required_error: 'Category is required',
    invalid_type_error:
      'Category must be one of: electronics, fashion, beauty, accessories, home',
  }),

  subCategory: z.enum(['gents', 'ladies']).nullable().optional(),

  gender: z.enum(['gents', 'ladies', 'unisex']).nullable().optional(),

  stock: z
    .number({
      invalid_type_error: 'Stock must be a number',
    })
    .int('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .default(0),

  rating: z
    .number({
      invalid_type_error: 'Rating must be a number',
    })
    .min(0, 'Rating must be between 0 and 5')
    .max(5, 'Rating must be between 0 and 5')
    .optional()
    .default(0),

  isFlashSale: z.boolean().default(false),

  isActive: z.boolean().default(true),

  sizes: z
    .array(
      z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], {
        errorMap: () => ({ message: 'Invalid size. Must be one of: XS, S, M, L, XL, XXL, XXXL' }),
      })
    )
    .default([]),
})

// Form data type (includes files for image upload)
export const productFormSchema = createProductSchema.extend({
  images: z
    .array(z.instanceof(File))
    .min(1, 'Product must have at least 1 image')
    .max(5, 'Product can have maximum 5 images'),
})

export type CreateProductFormData = z.infer<typeof productFormSchema>
export type CreateProductData = z.infer<typeof createProductSchema>
