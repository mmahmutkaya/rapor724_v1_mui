import styles from '../../../../styles/P_Groups_ID_Announces.module.css'
import DuyuruListItem from '../../../../components/DuyuruListItem'
import GroupHeader from '../../../../components/GroupHeader'
import Link from 'next/link';


const P_GroupAnnounces = ({ group, duyurular }) => {

  // const router = useRouter()
  // const { param } = router.query


  return (
    <>
      <div className={styles.Page}>

        <GroupHeader group={group} />

        <div className={styles.duyurulist_container}>
          {duyurular.map(duyuru => {
            return (
              <Link key={duyuru.id} href={`/${"groups"}/${group.id}/${"announces"}`} >
                <DuyuruListItem duyuru={duyuru} />
              </Link>
            )
          })}
        </div>


      </div>

      {/* <div className={styles.container}>
        <p>{post}</p>
        <p>{id}</p>
      </div> */}
    </>
  );
}


export async function getServerSideProps(context) {

  const param = context.params.id // Get ID from slug `/book/1
  const zaman = new Date();


  const group = {
    id: 444,
    name: "Taksim 360 - 362 ada"
  }

  const duyurular = [
    {
      id: 1,
      name: "T360 Madenler Grubu",
      createdAt: zaman.getDate(),
    },
    {
      id: 2,
      name: "T360 Seksenler Grubu",
      createdAt: zaman.getDate(),
    }
  ]

  //   // Get ID from slug `/book/1
  //   // const id = "333"

  return {
    props: {
      group, duyurular
    },
  }


}



export default P_GroupAnnounces;