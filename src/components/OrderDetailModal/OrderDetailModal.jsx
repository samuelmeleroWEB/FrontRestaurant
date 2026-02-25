import React from 'react';
import styles from './OrderDetailModal.module.css';
import { X } from 'lucide-react';

const OrderDetailModal = ({ order, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <header className={styles.header}>
          <h2>Detalle Pedido # {order.orderNumber || order._id.slice(-4)}</h2>
          <button onClick={onClose} className={styles.closeBtn}><X /></button>
        </header>

        <section className={styles.content}>
          <div className={styles.infoRow}>
            <span>Mesa: <strong>{order.table?.number || 'S/N'}</strong></span>
            <span>Estado: <strong className={styles[order.status]}>{order.status}</strong></span>
          </div>

          <div className={styles.itemsList}>
            <h3>Productos:</h3>
            {order.items.map((item, index) => (
              <div key={index} className={styles.item}>
                <span className={styles.quantity}>{item.quantity}x</span>
                <span className={styles.productName}>
                  {/* Si hiciste populate, usa item.product.name */}
                  {item.product?.name || 'Producto desconocido'}
                </span>
                <span className={styles.itemPrice}>
                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.total}>
            <span>Total:</span>
            <span>${(order.totalAmount || order.total || 0).toFixed(2)}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OrderDetailModal;