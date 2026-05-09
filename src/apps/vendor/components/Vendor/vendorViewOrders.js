import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import VendorNav from './vendorNav';
import '../../styles/vendorViewOrders.css';
import {FaTrash, FaEdit} from 'react-icons/fa'; // Importing Font Awesome icons

const VendorViewOrders = () => {
  const navigator = useNavigate ();
  const user_id = localStorage.getItem ('user_id');
  const [activeTab, setActiveTab] = useState ('allOrders');
  const [allProducts, setAllProducts] = useState ([]);
  const [allOrders, setAllOrders] = useState ([]);
  const [showConfirmation, setShowConfirmation] = useState (false);
  const [orderToDelete, setOrderToDelete] = useState (null);
  const [productDetails, setProductDetails] = useState (null);
  const [showProductDetails, setShowProductDetails] = useState (false);
  const [showEditForm, setShowEditForm] = useState (false);
  const [editableProduct, setEditableProduct] = useState (null);

  useEffect (
    () => {
      fetchAllProducts ();
      fetchOrders ();
    },
    [user_id]
  );

  const fetchAllProducts = async () => {
    try {
      const response = await fetch (
        `https://olumsx-backend-deploy-new.vercel.app/api/product/recentproducts?userId=${user_id}`
      );
      if (!response.ok) {
        throw new Error ('Failed to fetch products');
      }
      const productsData = await response.json ();
      setAllProducts (productsData);
    } catch (error) {
      console.error ('Error fetching products:', error);
    }
  };

  const EditProductForm = ({product, onClose, onSave}) => {
    const [formData, setFormData] = useState ({
      _id: product._id,
      name: product.name,
      category: product.category || '',
      price: product.price,
      vendor: user_id,
      description: product.description,
    });

    const handleChange = e => {
      setFormData ({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async e => {
      e.preventDefault ();
      try {
        const response = await fetch (
          `https://olumsx-backend-deploy-new.vercel.app/api/product/updateproduct`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify (formData),
          }
        );
        if (!response.ok) throw new Error ('Failed to update product');
        const result = await response.json ();
        onSave (result); // Call onSave to update the UI state
        onClose (); // Close form on successful update
      } catch (error) {
        console.error ('Error updating product:', error);
        toast.error ('Failed to update product');
      }
    };

    return (
      <div className="edit-form-popup">
        <div className="edit-form-container">
          <form onSubmit={handleSubmit} className="edit-form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label htmlFor="category">Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />

            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />

            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary" onCLick>
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch (
        'https://olumsx-backend-deploy-new.vercel.app/api/orders/vendororders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify ({vendorID: user_id}),
        }
      );
      if (!response.ok) {
        throw new Error ('Failed to fetch orders');
      }
      const ordersData = await response.json ();
      setAllOrders (ordersData);
    } catch (error) {
      console.error ('Error fetching orders:', error);
    }
  };

  const handleDeleteOrder = async orderId => {
    setShowConfirmation (true);
    setOrderToDelete (orderId);
    document.body.classList.add ('freeze-scroll-delete');
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDeleteProduct (orderToDelete);
      setAllOrders (allOrders.filter (order => order._id !== orderToDelete));
      setShowConfirmation (false);
      document.body.classList.remove ('freeze-scroll-delete');
    } catch (error) {
      console.error ('Error deleting order:', error);
    }
  };

  const handleAcceptOrder = async orderId => {
    console.log ('Accepting order with ID:', orderId);
    try {
      const response = await fetch (
        `https://olumsx-backend-deploy-new.vercel.app/api/orders/confirmorder`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify ({orderId}),
        }
      );
      if (!response.ok) {
        throw new Error ('Failed to accept order');
      }
      const updatedOrder = await response.json ();
      // Update the order status in the UI
      setAllOrders (prevOrders =>
        prevOrders.map (order => {
          if (order._id === updatedOrder._id) {
            return {...order, status: updatedOrder.status}; // Update the status based on response
          }
          return order;
        })
      );

      // Reload the page after the state has been updated
      window.location.reload ();
    } catch (error) {
      console.error ('Error accepting order:', error);
    }
  };

  const handleDeleteProduct = async productId => {
    fetch (
      'https://olumsx-backend-deploy-new.vercel.app/api/product/deleteproduct',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({productId: productId}),
      }
    )
      .then (response => {
        if (!response.ok) throw new Error ('Failed to delete product');
        return response.json ();
      })
      .then (data => {
        if (data.error) {
          toast.error (data.error);
        } else {
          toast.success (data.message);
          fetchAllProducts ();
        }
        return data;
      })
      .catch (error => {
        console.error (error);
        throw error;
      });
  };

  const handleViewProductDetails = async orderID => {
    if (orderToDelete !== orderID || !showProductDetails) {
      try {
        const response = await fetch (
          `https://olumsx-backend-deploy-new.vercel.app/api/orders/fetchproddetails`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify ({orderID}),
          }
        );
        if (!response.ok) {
          throw new Error ('Failed to fetch product details');
        }
        const productData = await response.json ();
        setProductDetails (productData);
        setOrderToDelete (orderID);
        setShowProductDetails (true);
      } catch (error) {
        console.error ('Error fetching product details:', error);
      }
    } else {
      setShowProductDetails (false);
    }
  };

  const handleHideDetails = () => {
    setShowProductDetails (false);
  };

  const handleEdit = product => {
    setEditableProduct (product);
    setShowEditForm (true);
    document.body.classList.add ('freeze-scroll-edit');
  };

  const handleCancelEdit = () => {
    setShowEditForm (false);
    setEditableProduct (null);
    document.body.classList.remove ('freeze-scroll-edit');
  };

  const handleSaveEdit = updatedProduct => {
    // Logic to update the product on the server could go here
    setAllProducts (
      allProducts.map (product => {
        if (product._id === updatedProduct._id) {
          return {...product, ...updatedProduct};
        }
        return product;
      })
    );
    setShowEditForm (false);
    setEditableProduct (null);
    document.body.classList.remove ('freeze-scroll-edit');
  };

  const handleCancelDelete = () => {
    setShowConfirmation (false);
    setOrderToDelete (null);
    document.body.classList.remove ('freeze-scroll-delete');
  };

  return (
    <div className="vendor-view-orders-container bg-white montserrat">
      <VendorNav />
      <div className="mini-navbar montserrat">
        <button
          className={activeTab === 'allProducts' ? 'active' : ''}
          onClick={() => setActiveTab ('allProducts')}
        >
          All Products
        </button>
        <button
          className={activeTab === 'allOrders' ? 'active' : ''}
          onClick={() => setActiveTab ('allOrders')}
        >
          All Orders
        </button>
      </div>
      <div className="order-container montserrat">
        {activeTab === 'allProducts' &&
          allProducts.map (product => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg p-4 mb-4 flex"
            >
              {/* Display Product Image */}
              <div className="w-1/2 aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={product.imageUrls[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/2 flex flex-col justify-center items-end">
              <h4 className="text-lg font-semibold text-gray-800 mt-4">
                Product ID: {product._id}
              </h4>
              <h5 className="text-md font-medium text-gray-700">
                Item: {product.name}
              </h5>
              <p className="text-sm text-gray-600">Price: {product.price}</p>
              <p className="text-sm text-gray-600">
                Description: {product.description}
              </p>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDeleteProduct (product._id)}
                  className="flex items-center justify-center p-2 rounded bg-red-500 text-white hover:bg-red-600 transition duration-300"
                >
                  <FaTrash className="icon" />
                </button>
                <button
                  onClick={() => handleEdit (product)}
                  className="flex items-center justify-center p-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ml-2"
                >
                  <FaEdit className="icon" />
                </button>
              </div>
              </div>
            </div>
          ))}
        {activeTab === 'allOrders' &&
          allOrders.map (order => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-lg p-4 mb-4 relative"
            >
              {order.status === false &&
                <button
                  onClick={() => handleAcceptOrder (order._id)}
                  className="btn btn-success m-2 p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 absolute top-4 right-4"
                >
                  Accept Order
                </button>}
              <h4 className="text-lg font-semibold text-gray-800">
                Order ID: {order._id}
              </h4>
              <p className="text-sm text-gray-600">Bill: {order.bill}</p>
              <p>
                Status:
                {' '}
                {order.status
                  ? <span className="text-green-500 font-medium">Accepted</span>
                  : <span className="text-red-500 font-medium">
                      Approval Pending
                    </span>}
              </p>
              <button
                onClick={() => handleViewProductDetails (order._id)}
                className="view-details-button mt-4 bg-blue-100 text-blue-700 p-2 rounded hover:bg-blue-200 transition duration-300"
              >
                {showProductDetails && orderToDelete === order._id
                  ? 'Hide Details'
                  : 'View Product Details'}
              </button>
              <div
                className={`transition-all duration-800 ease-in-out overflow-hidden ${showProductDetails && orderToDelete === order._id ? 'h-auto' : 'h-0'}`}
              >
                <div className="product-details border-t pt-4 mt-4 montserrat">
                  {productDetails &&
                    productDetails.map (product => (
                      <div
                        key={product._id}
                        className="mt-4 bg-white p-3 rounded-lg shadow-sm"
                      >
                        {/* <p className="text-sm font-medium text-gray-800">Product ID: {product._id}</p> */}
                        <p className="text-lg font-semibold text-gray-900">
                          Name: {product.name}
                        </p>
                        <p className="text-md font-medium text-gray-700">
                          Price: {product.price}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          Quantity: {product.quantity}
                        </p>
                        <p className="text-sm text-gray-600 italic">
                          Description: {product.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

            </div>
          ))}
      </div>

      {showConfirmation &&
        <div className="confirmation-popup">
          <p>Are you sure you want to delete this order?</p>
          <div className="confirmation-buttons">
            <button onClick={handleConfirmDelete} className="btn btn-danger">
              Yes
            </button>
            <button onClick={handleCancelDelete} className="btn btn-secondary">
              No
            </button>
          </div>
        </div>}
      {showEditForm &&
        editableProduct &&
        <EditProductForm
          product={editableProduct}
          onClose={handleCancelEdit}
          onSave={handleSaveEdit}
        />}
    </div>
  );
};

export default VendorViewOrders;
