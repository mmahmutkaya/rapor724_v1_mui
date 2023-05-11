
import styles from '../styles/UyeListItem.module.css'

const Component = ({ uye }) => {

  return (
    <div className={styles.card}>
      <div className={styles.grid_container}>
        <div >{uye.name}</div>
        <div className={styles.bilgi2}>John Doe</div>
        <div className={styles.bilgi3}>Architect & Engineer</div>
      </div>
    </div>
  );
  
}

export default Component;