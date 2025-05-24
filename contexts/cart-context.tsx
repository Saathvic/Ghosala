"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import type { CartItem, Product } from '@/lib/types'

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

interface CartAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'UPDATE_QUANTITY' | 'CLEAR_CART'
  payload?: any
}

interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.images[0]
        }
        newItems = [...state.items, newItem]
      }
      
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return { items: newItems, total, itemCount }
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return { items: newItems, total, itemCount }
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: productId })
      }
      
      const newItems = state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return { items: newItems, total, itemCount }
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 }
    
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  })  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('ghosala-cart')
        if (savedCart) {
          try {
            const cartData = JSON.parse(savedCart)
            if (cartData && Array.isArray(cartData.items)) {
              dispatch({
                type: 'CLEAR_CART'
              })
              cartData.items.forEach((item: CartItem) => {
                dispatch({
                  type: 'ADD_ITEM',
                  payload: { 
                    product: {
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      images: [item.image]
                    }, 
                    quantity: item.quantity 
                  }
                })
              })
            }
          } catch (error) {
            console.error('Error parsing cart data from localStorage:', error)
          }
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error)
      }
    }
  }, [])
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ghosala-cart', JSON.stringify(state))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [state])

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
  }

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
