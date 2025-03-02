import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProducts, useAddProduct, useDeleteProduct, useUpdateProduct } from "./query";

const AdminPage: React.FC = () => {
  const { data: products, isLoading, error, refetch } = useGetProducts(); // Add refetch here
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    item_name: "",
    item_type: "",
    item_description: "",
    item_price: 0,
    image: "" as string,
  });

  const { mutate: addProduct } = useAddProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error(error);
    return <div>Error loading products</div>;
  }

  const handleAddProduct = () => {
    if (!newProduct.item_name || !newProduct.item_type || !newProduct.item_price) {
      alert("Please fill in all fields.");
      return;
    }
    addProduct(newProduct, {
      onSuccess: () => {
        alert("Product added successfully!");
        setNewProduct({ item_name: "", item_type: "", item_description: "", item_price: 0, image: "" });
        refetch();  
      },
    });
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id, {
      onSuccess: () => {
        alert("Product deleted successfully!");
        refetch(); 
      },
    });
  };

  const handleUpdateProduct = () => {
    if (!selectedProduct) {
      alert("Please select a product to update.");
      return;
    }
  
    const updatedProduct = {
      id: selectedProduct._id, 
      item_name: selectedProduct.item_name,
      item_type: selectedProduct.item_type,
      item_description: selectedProduct.item_description,
      item_price: selectedProduct.item_price,
      image: selectedProduct.image,
    };
  
    updateProduct(updatedProduct, {
      onSuccess: () => {
        alert("Product updated successfully!");
        setSelectedProduct(null); 
        refetch();  
      },
    });
  };

  const handleLogout = () => {
    navigate("/");  
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Custom Header with Logout Button */}
      <div className="bg-black text-white p-4 flex justify-between items-center text-white">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <div className="flex gap-4">
    <button
      onClick={() => navigate("/bookings")} 
      className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
    >
      View Bookings
    </button>

    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  </div>
      </div>

      <div className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin - Manage Products</h1>

          {/* Add Product Form */}
          <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.item_name}
              onChange={(e) => setNewProduct({ ...newProduct, item_name: e.target.value })}
              className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Product Type"
              value={newProduct.item_type}
              onChange={(e) => setNewProduct({ ...newProduct, item_type: e.target.value })}
              className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={newProduct.item_description}
              onChange={(e) => setNewProduct({ ...newProduct, item_description: e.target.value })}
              className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.item_price}
              onChange={(e) => setNewProduct({ ...newProduct, item_price: Number(e.target.value) })}
              className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
            />
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewProduct({ ...newProduct, image: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleAddProduct}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Add Product
            </button>
          </div>

          {/* Update Product Form */}
          <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Product</h2>
            {selectedProduct ? (
              <>
                <input
                  type="text"
                  value={selectedProduct.item_name}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, item_name: e.target.value })
                  }
                  className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={selectedProduct.item_type}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, item_type: e.target.value })
                  }
                  className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
                />
                <textarea
                  value={selectedProduct.item_description}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      item_description: e.target.value,
                    })
                  }
                  className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  value={selectedProduct.item_price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      item_price: Number(e.target.value),
                    })
                  }
                  className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
                />
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setSelectedProduct({ ...selectedProduct, image: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
                />
                <button
                  onClick={handleUpdateProduct}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update Product
                </button>
              </>
            ) : (
              <p>Please select a product to update.</p>
            )}
          </div>

          {/* Product List with Update and Delete Options */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Existing Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.item_name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.item_name}</h2>
                    <p className="text-gray-600 mb-4">{product.item_description || "No description available"}</p>
                    <p className="text-lg font-bold text-gray-900">
                      {product.item_price ? `$${product.item_price}` : "Price not available"}
                    </p>

                    {/* Update and Delete Buttons */}
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;