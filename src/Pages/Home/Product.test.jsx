import { it, expect, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { Product } from './Product'

vi.mock('axios')

describe('product component', () => {
    it('displays the product details correctly', () => {

        const product = {
            id: "1c079479-8586-494f-ab53-219325432536",
            image: "images/products/men-athletic-shoes-white.jpg",
            name: "Men's Athletic Sneaker - White",
            rating: {
                stars: 4,
                count: 229
            },
            priceCents: 4590,
            keywords: ["shoes", "running shoes", "footwear", "mens"]
        }
 
        const loadCart = vi.fn()

        render(<Product product={product} loadCart={loadCart} />)

        expect(
            screen.getByText("Men's Athletic Sneaker - White")
        ).toBeInTheDocument()

        expect(
            screen.getByText('$45.90')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', 'images/products/men-athletic-shoes-white.jpg')

        expect(
            screen.getByTestId('product-rating-stars-image')
        ).toHaveAttribute('src', 'images/ratings/rating-40.png')

        expect(
            screen.getByText('229')
        ).toBeInTheDocument()

    })
    it('adds a product to the cart', async () => {

        const product = {
            id: "1c079479-8586-494f-ab53-219325432536",
            image: "images/products/men-athletic-shoes-white.jpg",
            name: "Men's Athletic Sneaker - White",
            rating: {
                stars: 4,
                count: 229
            },
            priceCents: 4590,
            keywords: ["shoes", "running shoes", "footwear", "mens"]
        }

        const loadCart = vi.fn()

        render(<Product product={product} loadCart={loadCart} />)

        const user = userEvent.setup()
        const addToCartButton = screen.getByTestId('add-to-cart-button')
        await user.click(addToCartButton)

        expect(axios.post).toHaveBeenCalledWith('/api/cart-items',
            {
                productId:'1c079479-8586-494f-ab53-219325432536',
                quantity: 1
            }
        )
        expect(loadCart).toHaveBeenCalled()

    })



})
