import React, { useState } from 'react';
import { Search, ShoppingCart, CreditCard, Plus, Minus, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';

// Images
import sandwichImg from '../assets/food/sandwich.png';
import pizzaImg from '../assets/food/pizza.png';
import saladImg from '../assets/food/salad.png';
import coffeeImg from '../assets/food/coffee.png';
import muffinImg from '../assets/food/muffin.png';
import burgerImg from '../assets/food/burger.png';
import pastaImg from '../assets/food/pasta.png';
import sushiImg from '../assets/food/sushi.png';

interface MenuItem {
    id: number;
    name: string;
    price: number;
    category: string;
    calories: number;
    image: string;
}

interface CartItem extends MenuItem {
    quantity: number;
}

const Cafeteria: React.FC = () => {
    const [category, setCategory] = useState('All');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

    const menuItems: MenuItem[] = [
        { id: 1, name: 'Grilled Chicken Sandwich', price: 6.50, category: 'Lunch', calories: 450, image: sandwichImg },
        { id: 2, name: 'Vegetarian Pizza Slice', price: 3.00, category: 'Lunch', calories: 300, image: pizzaImg },
        { id: 3, name: 'Caesar Salad', price: 5.50, category: 'Lunch', calories: 250, image: saladImg },
        { id: 4, name: 'Morning Brew Coffee', price: 2.50, category: 'Beverage', calories: 10, image: coffeeImg },
        { id: 5, name: 'Blueberry Muffin', price: 2.75, category: 'Breakfast', calories: 350, image: muffinImg },
        { id: 6, name: 'Gourmet Burger', price: 8.50, category: 'Lunch', calories: 750, image: burgerImg },
        { id: 7, name: 'Pasta Primavera', price: 7.00, category: 'Lunch', calories: 550, image: pastaImg },
        { id: 8, name: 'Sushi Platter', price: 12.00, category: 'Lunch', calories: 400, image: sushiImg },
    ];

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(i => i.id !== id));
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(i => {
            if (i.id === id) {
                const newQty = i.quantity + delta;
                return newQty > 0 ? { ...i, quantity: newQty } : i;
            }
            return i;
        }));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handlePayment = () => {
        setIsPaymentSuccess(true);
        setTimeout(() => {
            setIsPaymentSuccess(false);
            setShowPaymentSuccess(true);
            setCart([]);
            setIsCartOpen(false);
        }, 1500);
    };

    const filteredItems = category === 'All' ? menuItems : menuItems.filter(item => item.category === category);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cafeteria Menu</h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search food..."
                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['All', 'Breakfast', 'Lunch', 'Beverage'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${category === cat
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all group">
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                                <span className="text-white font-bold">${item.price.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{item.name}</h3>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">{item.category}</span>
                                <span>{item.calories} cal</span>
                            </div>
                            <button
                                onClick={() => addToCart(item)}
                                className="w-full py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all transform active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add to Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart Modal */}
            <Modal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                title="Your Order"
            >
                {cart.length > 0 ? (
                    <div className="space-y-6">
                        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700/30 p-3 rounded-xl">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)} each</div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-1 hover:text-indigo-600 disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-medium w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-1 hover:text-indigo-600"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-4">
                            <div className="flex justify-between items-center text-lg font-bold text-gray-900 dark:text-white">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={isPaymentSuccess}
                                className={`w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${isPaymentSuccess
                                        ? 'bg-green-500'
                                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/25'
                                    }`}
                            >
                                {isPaymentSuccess ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        Pay with Student Card
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-gray-500 text-center">
                        <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                        <p className="text-lg font-medium">Your cart is empty</p>
                        <p className="text-sm">Add some delicious food to get started!</p>
                    </div>
                )}
            </Modal>

            {/* Success Modal */}
            <Modal
                isOpen={showPaymentSuccess}
                onClose={() => setShowPaymentSuccess(false)}
                title="Payment Successful"
            >
                <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CreditCard className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Confirmed!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Your payment was processed successfully using your Student Card.
                        <br />
                        Your order number is <span className="font-mono font-bold text-indigo-600">#{Math.floor(Math.random() * 10000)}</span>
                    </p>
                    <button
                        onClick={() => setShowPaymentSuccess(false)}
                        className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
                    >
                        Done
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Cafeteria;
