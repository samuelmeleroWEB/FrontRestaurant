import React, { useState } from "react";
import axios from "../../api/axios";
import styles from "./OrderCard.module.css";

const OrderCard = ({ order, onOrderUpdate }) => {
  const [loading, setLoading] = useState(false);
  const statuses = ["pendiente", "cocinando", "listo", "servido"];

  const handleStatusChange = async (newStatus) => {
    const cleanStatus = newStatus.toLowerCase().trim();
    try {
      setLoading(true);
      const res = await axios.patch(`/orders/${order._id}/status`, {
        status: cleanStatus,
      });
      if (onOrderUpdate) onOrderUpdate(res.data);
    } catch (error) {
      console.error("Error al actualizar:", error.response?.data);
      alert(error.response?.data?.message || "Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "";
    return styles[status.toLowerCase()] || "";
  };

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
        <div className={styles.orderIdentity}>
          <h3 className={styles.tableName}>
            {order.table?.number ? `Mesa ${order.table.number}` : "Para llevar"}
          </h3>
          <span className={styles.orderTag}>
            ID: {order.orderNumber || order._id.slice(-4)}
          </span>
        </div>

        <select
          className={`${styles.statusBadge} ${getStatusClass(order.status)}`}
          value={order.status?.toLowerCase()}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={loading}
          onClick={(e) => e.stopPropagation()}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <span className={styles.timeInfo}>
        Pedido a las {formatTime(order.createdAt)}
      </span>

      <div className={styles.cardFooter}>
        <span className={styles.itemsCount}>
          {order.items?.reduce((acc, i) => acc + i.quantity, 0) || 0} productos
        </span>
        <span className={styles.price}>
          ${(order.totalAmount || order.total || 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;