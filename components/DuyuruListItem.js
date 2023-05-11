
import styles from '../styles/DuyuruListItem.module.css'

const Component = ({ duyuru }) => {

  return (
    <div className={styles.card}>
      <div className={styles.grid_container}>
        <div >{duyuru.name}</div>
        <div className={styles.bilgi2}>John Doe</div>
        <div className={styles.bilgi3}>Architect & Engineer</div>
      </div>
    </div>
  );
  
}

export default Component;