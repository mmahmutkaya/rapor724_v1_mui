
import styles from '../styles/VakaListItem.module.css'

const Component = ({ vaka }) => {

  return (
    <div className={styles.vakalist_item_container}>
      <div className={styles.vaka_name}>{vaka.name}</div>
      <div className={styles.vaka_olusturma}>12.05.1982</div>
      <div className={styles.vaka_durum}>Açık</div>
      <div className={styles.vaka_kalan}>3 Gün</div>
      {/* <div className={styles.bilgi3}>Architect & Engineer</div> */}
    </div>
  );

}

export default Component;