import { useRouter } from 'next/router'
import styles from '../../../../styles/P_Groups_ID_Members.module.css'
import UyelistItem from '../../../../components/UyeListItem'
import GroupHeader from '../../../../components/GroupHeader'
import Link from 'next/link';



const P_GroupDetail = ({ group, uyeler }) => {

  // const router = useRouter()
  // const { param } = router.query

  return (
    <>
      <div className={styles.Page}>

        <GroupHeader group={group} />

        <div className={styles.uyelist_container}>
          {uyeler.map(uye => {
            return (
              <Link key={uye.id} href={`/${"groups"}/${uye.id}/uye`} >
                <UyelistItem uye={uye} />
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

  const uyeler = [
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
      group, uyeler
    },
  }


}


export default P_GroupDetail;