
import styles from '../../../../styles/P_Groups_ID_Matters.module.css'
import VakaListItem from '../../../../components/VakaListItem'
import GroupHeader from '../../../../components/GroupHeader'
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { useApp } from "../../../../components/useApp";


const P_GroupMatters = () => {

  const RealmApp = useApp()

  const { asPath } = useRouter()
  const pathArray = asPath.split("/");
  const groupId = pathArray[2]

  // console.log(typeof groupId === "string")
  // console.log(groupId)

  const { isLoading, isError, data: group, error, refetch:refetch_group } = useQuery({
    queryKey: ['groups', groupId],
    // queryFn: deneme,
    queryFn: async () => await RealmApp.currentUser.callFunction("getGroup", {groupId}),
    refetchOnWindowFocus: false,
    enabled: !!RealmApp?.currentUser
    // staleTime: 5 * 1000, // 1000 milisecond --> 1 second
  })


  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className={styles.Page}>

        <GroupHeader group={group} />


        <div className={styles.vakalist_top}>

          <div className={styles.vakalist_top_left}>
            <div className={styles.vakalist_top_left_item}>{"Sırala"}</div>
            <div className={styles.vakalist_top_left_item}>{"Filtrele"}</div>
          </div>

          <div className={styles.vakalist_top_right}>
            <Link href={`${"/groups"}/`} className={styles.vakalist_top_right_logo_div}>
              <Image fill src="/plus-icon-23564.png" alt="back-icon" sizes="(min-width: 1em) 100vw" />
            </Link>
          </div>

        </div>

        <div className={styles.vakalist_item_header_container}>
          <div className={styles.vakalist_item_header_name}>{"Konu"}</div>
          <div className={styles.vakalist_item_header_olusturma}>{"Oluşturma"}</div>
          <div className={styles.vakalist_item_header_durum}>{"Durum"}</div>
          <div className={styles.vakalist_item_header_kalan}>{"Kalan"}</div>
        </div>

        <div className={styles.vakalist}>
          {/* {vakalar.map(vaka => {
            return (
              <Link key={vaka.id} href={`/${"groups"}/${vaka.id}/matters`} >
                <VakaListItem vaka={vaka} />
              </Link>
            )
          })} */}
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

  // const param = context.params.id // Get ID from slug `/book/1
  const zaman = new Date();


  const group = {
    id: 444,
    name: "Taksim 360 - 362 ada"
  }


  const vakalar = [
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
      group, vakalar
    },
  }


}


export default P_GroupMatters;