import { useEffect, useState } from "react";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";
import { LogOut, ShoppingBag, PlusCircle, XCircle } from "lucide-react"; // Ícones modernos

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setError("Falha ao carregar produtos.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

  const handleCreateProduct = async () => {
    const token = localStorage.getItem("idToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
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

      fetchProducts(); // Atualiza a lista de produtos após criar um novo
      handleCloseModal(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      setError("Falha ao criar produto.");
    }
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
            onClick={handleOpenModal}
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

      {/* Mensagem de erro */}
      {error && <p className="text-red-500 text-center text-lg mb-4">{error}</p>}

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Estoque: {product.stockQuantity}
              </p>
              <p className="text-green-600 font-bold text-lg mt-2">
                R$ {product.price.toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full col-span-3 text-lg">
            Nenhum produto encontrado.
          </p>
        )}
      </div>

      {/* Modal de Criação de Produto */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Novo Produto</h2>
              <button onClick={handleCloseModal}>
                <XCircle size={24} className="text-gray-500 hover:text-red-500" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Nome do Produto"
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                value={newProduct.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Descrição"
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                value={newProduct.description}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Preço"
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                value={newProduct.price}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="stockQuantity"
                placeholder="Quantidade em Estoque"
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                value={newProduct.stockQuantity}
                onChange={handleInputChange}
              />
              <button
                onClick={handleCreateProduct}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
              >
                Criar Produto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;