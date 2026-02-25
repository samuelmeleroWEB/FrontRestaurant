import React, { useState } from "react";
import axios from "../../api/axios";
import styles from "./OrderCard.module.css";

const OrderCard = ({ order, onOrderUpdate }) => {
  const [loading, setLoading] = useState(false);

  // 1. Sincronizado con ORDER_STATUS de tu backend (español y minúsculas)
  const statuses = ["pendiente", "cocinando", "listo", "servido"];

  const handleStatusChange = async (newStatus) => {
    // Limpiamos el valor por si acaso
    const cleanStatus = newStatus.toLowerCase().trim();

    try {
      setLoading(true);
      const res = await axios.patch(`/orders/${order._id}/status`, {
        status: cleanStatus,
      });

      if (onOrderUpdate) onOrderUpdate(res.data);
    } catch (error) {
      // Aquí verás si el backend sigue diciendo "Estado no válido"
      console.error("Error al actualizar:", error.response?.data);
      alert(error.response?.data?.message || "Error al actualizar");
    } finally {
      setLoading(false);
    }
  };
  // 2. Ajustado para usar los nombres del backend como nombres de clase CSS
  const getStatusClass = (status) => {
    if (!status) return "";
    const s = status.toLowerCase();
    // Esto buscará en tu CSS .pendiente, .cocinando, etc.
    return styles[s] || "";
  };

  // Formateo de hora (opcional, para mayor claridad)
  const formatTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`${styles.card} ${loading ? styles.updating : ""}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.orderId}>
          Order #{order.orderNumber || order._id.slice(-4)}
        </h3>

        <select
          className={`${styles.statusBadge} ${getStatusClass(order.status)}`}
          value={order.status?.toLowerCase()}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={loading}
          // AÑADE ESTO:
          onClick={(e) => e.stopPropagation()}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <p className={styles.tableInfo}>
        Mesa {order.table?.number || "S/N"} — {formatTime(order.createdAt)}
      </p>

      <div className={styles.cardFooter}>
        <span className={styles.items}>
          {order.items?.reduce((acc, i) => acc + i.quantity, 0) || 0} items
        </span>
        <span className={styles.price}>
          ${(order.totalAmount || order.total || 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
