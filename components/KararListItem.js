
import styles from '../styles/KararListItem.module.css'

const Component = ({ karar }) => {

  return (
    <div className={styles.card}>
      <div className={styles.grid_container}>
        <div >{karar.name}</div>
        <div className={styles.bilgi2}>John Doe</div>
        <div className={styles.bilgi3}>Architect & Engineer</div>
      </div>
    </div>
  );
  
}

export default Component;