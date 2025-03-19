import { useEffect, useState } from "react";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";
import { LogOut, ShoppingBag, PlusCircle, XCircle, Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2"; // Biblioteca de alertas

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("idToken");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await api.get("/products/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Dados retornados do backend:", response.data);
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProducts([]);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você realmente deseja sair?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, sair!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("idToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
      }
    });
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setNewProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity,
      });
    } else {
      setEditingProduct(null);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      stockQuantity: "",
    });
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSaveProduct = async () => {
    const token = localStorage.getItem("idToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      if (editingProduct) {
        // Atualizar produto existente
        await api.put(
          `/products/${editingProduct.id}`,
          {
            name: newProduct.name,
            description: newProduct.description,
            price: parseFloat(newProduct.price),
            stockQuantity: parseInt(newProduct.stockQuantity),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire("Atualizado!", "Produto atualizado com sucesso.", "success");
      } else {
        // Criar novo produto
        await api.post(
          "/products",
          {
            name: newProduct.name,
            description: newProduct.description,
            price: parseFloat(newProduct.price),
            stockQuantity: parseInt(newProduct.stockQuantity),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire("Criado!", "Produto criado com sucesso.", "success");
      }

      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      Swal.fire("Erro!", "Falha ao salvar produto.", "error");
    }
  };

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem("idToken");

    if (!token) {
      navigate("/login");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, deletar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire("Deletado!", "Produto removido com sucesso.", "success");
          fetchProducts();
        } catch (error) {
          console.error("Erro ao deletar produto:", error);
          Swal.fire("Erro!", "Falha ao deletar produto.", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-md">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-blue-500" size={28} />
          <h1 className="text-3xl font-bold text-gray-800">Meus Produtos</h1>
        </div>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={() => handleOpenModal()}
          >
            <PlusCircle size={20} />
            Novo Produto
          </button>
          <button
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-sm text-gray-500 mt-2">Estoque: {product.stockQuantity}</p>
            <p className="text-green-600 font-bold text-lg mt-2">R$ {product.price.toFixed(2)}</p>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => handleOpenModal(product)} className="text-blue-500 hover:text-blue-700">
                <Edit size={20} />
              </button>
              <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Criação/Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingProduct ? "Editar Produto" : "Novo Produto"}</h2>
              <button onClick={handleCloseModal}>
                <XCircle size={24} className="text-gray-500 hover:text-red-500" />
              </button>
            </div>
            <input type="text" name="name" placeholder="Nome" value={newProduct.name} onChange={handleInputChange} className="w-full p-2 border mb-2"/>
            <input type="text" name="description" placeholder="Descrição" value={newProduct.description} onChange={handleInputChange} className="w-full p-2 border mb-2"/>
            <input type="text" name="price" placeholder="Preço" value={newProduct.price} onChange={handleInputChange} className="w-full p-2 border mb-2"/>
            <input type="text" name="stockQuantity" placeholder="Quantidade em Estoque" value={newProduct.stockQuantity} onChange={handleInputChange} className="w-full p-2 border mb-2"/>
            <button onClick={handleSaveProduct} className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
              {editingProduct ? "Atualizar" : "Criar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;