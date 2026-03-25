import React from 'react';
import styles from './OrderDetailModal.module.css';
import { X } from 'lucide-react';

const OrderDetailModal = ({ order, onClose }) => {
  const orderTitle = order.table?.number ? `Mesa ${order.table.number}` : 'Para Llevar';
  const displayId = order.orderNumber || order._id.slice(-4).toUpperCase();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h2>{orderTitle}</h2>
            <span className={styles.orderId}>TICKET #{displayId}</span>
          </div>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </header>

        <section className={styles.content}>
          <div className={styles.infoRow}>
            <span>Estado:</span>
            <span className={`${styles.statusLabel} ${styles[order.status?.toLowerCase()]}`}>
              {order.status || 'Pendiente'}
            </span>
          </div>

          <div className={styles.itemsList}>
            <h3>Resumen de Consumo</h3>
            {order.items?.map((item, index) => (
              <div key={index} className={styles.item}>
                <span className={styles.quantity}>{item.quantity}x</span>
                <span className={styles.productName}>
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
            <label>Total a pagar</label>
            <span className={styles.totalAmount}>
              ${(order.totalAmount || order.total || 0).toFixed(2)}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OrderDetailModal;