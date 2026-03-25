import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "../../api/axios";
import { Search } from "lucide-react"; // Importamos el icono
import styles from "./MenuPage.module.css";

const MenuPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error cargando el menú:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["todos", ...new Set(products.map((p) => 
    typeof p.category === "object" ? p.category?.name : p.category
  ).filter(Boolean))];

  // Filtramos primero por categoría y luego por nombre
  const filteredProducts = products.filter((p) => {
    const catName = typeof p.category === "object" ? p.category?.name : p.category;
    const matchesCategory = filter === "todos" || catName === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Menú del Restaurante</h1>
          
          <div className={styles.searchBar}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar plato o bebida..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.categories}>
            {categories.map((cat, index) => (
              <button
                key={`${cat}-${index}`}
                className={`${styles.catBtn} ${filter === cat ? styles.active : ""}`}
                onClick={() => setFilter(cat)}
              >
                {typeof cat === "string" ? cat.charAt(0).toUpperCase() + cat.slice(1) : "Sin categoría"}
              </button>
            ))}
          </div>
        </header>

        {loading ? (
          <p className={styles.statusText}>Cargando carta...</p>
        ) : (
          <div className={styles.menuGrid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className={`${styles.productCard} ${!product.isAvailable ? styles.unavailable : ""}`}
                >
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.footer}>
                      <span className={styles.price}>${product.price?.toFixed(2)}</span>
                      {!product.isAvailable && <span className={styles.statusBadge}>No disponible</span>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.statusText}>No se encontraron resultados para "{searchTerm}"</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MenuPage;