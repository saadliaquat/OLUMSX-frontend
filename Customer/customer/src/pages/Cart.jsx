import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../components/Header/Navbar';
import Footer from "../components/Footer/FooterFixed";

const Cart = () => {
    const navigator = useNavigate();
    const user_id = localStorage.getItem("userId");
    const [products, setProducts] = useState([]);
    const [tot_price, setTotalPrice] = useState(0);

    const updateTotalPrice = () => {
        fetch("https://olumsx-backend-deploy-new.vercel.app/api/cart/getcartprice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerID: user_id }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setTotalPrice(data.tot_price);
                }
            });
    };

    useEffect(() => {
        fetch("https://olumsx-backend-deploy-new.vercel.app/api/prodcart/getcartitems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerID: user_id }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setProducts(data);
                    updateTotalPrice();
                }
            });
    }, []);

    const handleRemoveProduct = (productId) => {
        fetch("https://olumsx-backend-deploy-new.vercel.app/api/prodcart/removefromcart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerID: user_id, productID: productId }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                    console.log(`error: ${data.error}`);
                    navigator("/customerHome");
                } else {
                    alert(data.message);
                    fetch("https://olumsx-backend-deploy-new.vercel.app/api/prodcart/getcartitems", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ customerID: user_id }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.error) {
                                alert(data.error);
                                console.log(`error: ${data.error}`);
                            } else {
                                setProducts(data);
                                updateTotalPrice();
                                console.log("product removed from cart successfully. ");
                            }
                        });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to update cart.');
            });
    };

    const handleAddProduct = (productId) => {
        fetch("https://olumsx-backend-deploy-new.vercel.app/api/prodcart/addtocart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerID: user_id, productID: productId }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                    console.log(`error: ${data.error}`);
                    navigator("/customerHome");
                } else {
                    alert(data.message);
                    fetch("https://olumsx-backend-deploy-new.vercel.app/api/prodcart/getcartitems", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ customerID: user_id }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.error) {
                                alert(data.error);
                                console.log(`error: ${data.error}`);
                            } else {
                                setProducts(data);
                                updateTotalPrice();
                                console.log("product added to cart successfully. ");
                            }
                        });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to update cart.');
            });
    };

    const handleCheckout = () => {
        if (products.length === 0)
        {
            alert("CANNOT Checkout: Cart is Empty!")
            return;
        }

        fetch("https://olumsx-backend-deploy-new.vercel.app/api/orders/createordersdiffvendors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerId: user_id, products: products }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log(`error: ${data.error}`);
                    alert(data.error);
                } else {
                    alert("Orders placed successfully for each vendor.");
                    console.log("orders placed successfully for each vendor.");

                    fetch("https://olumsx-backend-deploy-new.vercel.app/api/prodcart/getcartitems", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ customerID: user_id }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.error) {
                                alert(data.error);
                                console.log(`error: ${data.error}`);
                            } else {
                                setProducts(data);
                                updateTotalPrice();
                                console.log("product added to cart successfully. ");
                            }
                        });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to place order.');
            });
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-semibold text-gray-900 my-8 text-center">Cart</h1>
            </div>

            <div className="container mx-auto p-6 flex flex-col md:flex-row">
                {/* Cart Items */}
                <div className="flex-grow p-4 bg-white rounded-lg shadow-md mb-4 md:mb-0">
                    {products.map((product) => (
                        <div key={product._id} className="flex items-start justify-between border-b p-4">
                            <img src={product.imageUrls[0]} alt={product.name} className="h-24 w-24 object-cover rounded mr-4" />
                            <div className="flex flex-col justify-between flex-grow">
                                <p className="font-semibold text-gray-700">{product.name}</p>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Category: {product.category}</p>
                                        <p className="text-sm text-gray-500">Price: Rs.{product.price}</p>
                                        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="px-3 py-2 bg-red-600 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded" onClick={() => handleRemoveProduct(product._id)}>
                                            -
                                        </button>
                                        <button className="px-3 py-2 bg-green-600 text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded" onClick={() => handleAddProduct(product._id)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Section */}
                <div className="w-full md:w-1/4 p-4 bg-gray-50 rounded-lg shadow-md ml-6">
                    <h2 className="font-semibold text-2xl text-gray-800">Summary</h2>
                    <div className="mt-4">
                        <p className="text-gray-600">Items {products.length} </p>
                        {products.map((product) => (
                            <div key={product._id} className="flex items-start justify-between border-b p-4">
                                <div className="flex flex-col justify-between flex-grow">
                                    <p className="font-semibold text-gray-700">{product.name}</p>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">Price: Rs.{product.price}</p>
                                            <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-4">
                        <p className="text-gray-600">Total Price:</p>
                        <p className="font-semibold text-gray-900">Rs.{parseFloat(tot_price)}</p>
                    </div>
                    <button className="w-full mt-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => handleCheckout()}>
                        Checkout
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Cart;
