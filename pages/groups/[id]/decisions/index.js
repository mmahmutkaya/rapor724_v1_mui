import styles from '../../../../styles/P_Groups_ID_Decisions.module.css'
import KararListItem from '../../../../components/KararListItem'
import GroupHeader from '../../../../components/GroupHeader'
import Link from 'next/link';

const P_GroupDecision = ({ group, kararlar }) => {

  // const router = useRouter()
  // const { param } = router.query

  return (
    <>
      <div className={styles.Page}>

        <GroupHeader group={group} />

        <div className={styles.kararlist_container}>
          {kararlar.map(karar => {
            return (
              <Link key={karar.id} href={`/${"groups"}/${karar.id}/decision`} >
                <KararListItem karar={karar} />
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
    id: param,
    name: "T360 Madenler Grubu"
  }

  const kararlar = [
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
      group, kararlar
    },
  }


}


export default P_GroupDecision;