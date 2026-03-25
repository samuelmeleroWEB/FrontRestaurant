import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrderDetailModal from '../../components/OrderDetailModal/OrderDetailModal'; // Importa el modal
import axios from '../../api/axios'; 
import styles from './HomePage.module.css';
import { Bell, Briefcase, RefreshCw } from 'lucide-react';

const HomePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // Estado para el pedido seleccionado

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/orders'); 
      setOrders(res.data);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderUpdate = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      )
    );
    // Si el modal está abierto con esta orden, actualizamos los datos del modal también
    if (selectedOrder?._id === updatedOrder._id) {
      setSelectedOrder(updatedOrder);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Orders</h1>
          <div className={styles.headerIcons}>
            <button onClick={fetchOrders} className={styles.refreshBtn} title="Refrescar">
              <RefreshCw size={20} className={loading ? styles.spin : ''} />
            </button>
            <Briefcase size={20} />
            <Bell size={20} />
          </div>
        </header>
        
        {loading ? (
          <p className={styles.statusText}>Cargando pedidos...</p>
        ) : (
          <div className={styles.grid}>
            {orders.length > 0 ? (
              orders.map(order => (
                <div 
                  key={order._id || order.id} 
                  onClick={() => setSelectedOrder(order)} // Al clicar, guardamos el pedido
                  style={{ cursor: 'pointer' }}
                >
                  <OrderCard 
                    order={order} 
                    onOrderUpdate={handleOrderUpdate} 
                  />
                </div>
              ))
            ) : (
              <p className={styles.statusText}>No hay pedidos activos en este momento.</p>
            )}
          </div>
        )}
      </main>

      {/* Renderizado condicional del Modal */}
      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default HomePage;