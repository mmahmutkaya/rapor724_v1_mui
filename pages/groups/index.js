// import { useRouter } from 'next/router'
import styles from '../../styles/P_Groups.module.css'
import GroupListItem from '../../components/GroupListItem.js'
import FormGroupCreate from '../../components/FormGroupCreate.js'
import Link from 'next/link'
import Image from 'next/image'
import { useState, } from "react";
import { useApp } from "../../components/useApp"
import { useQuery } from '@tanstack/react-query'



const P_GroupList = () => {

  const [show, setShow] = useState("Groups")

  const RealmApp = useApp()

  const openFormGroupCreate = () => {
    setShow("FormGroupCreate")
  }

  const { isLoading, isError, data: groups, error, refetch:refetch_groups } = useQuery({
    queryKey: ['groups'],
    // queryFn: deneme,
    queryFn: async () => await RealmApp.currentUser.callFunction("getGroups"),
    refetchOnWindowFocus: false,
    enabled: !!RealmApp?.currentUser,
    // staleTime: 5 * 1000, // 1000 milisecond --> 1 second
  })


  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  return (
    <>

      <div className={styles.Page}>

        <div className={styles.Header}>

          <div className={styles.HeaderA}>

            <div className={styles.HeaderA_left}>
              <div>Gruplar</div>
            </div>

            <div className={styles.HeaderA_right}>
              <div className={styles.logo_right_div} onClick={openFormGroupCreate}>
                <Image fill src="/plus-icon-23564.png" alt="Rapor724_Logo" sizes="(min-width: 1em) 100vw"/>
              </div>
            </div>

            {/* <div className={styles.HeaderA_right}>
              <div className={styles.logo_right_div}>
                <Link href="/" >
                  <Image fill src="/plus-icon-23564.png" alt="Rapor724_Logo" />
                </Link>
              </div>
            </div> */}

          </div>

        </div>

        {/* <div className={styles.groupForm}> */}

        {show === "FormGroupCreate" &&
          <FormGroupCreate setShow={setShow} refetch_groups={refetch_groups}/>
        }

        {show === "Groups" && groups.length == 0 &&
          <div className={styles.GroupList}>
            Çalışma grubu oluşturmak için artı işaretine tıklayınız.
          </div>
        }

        {show === "Groups" && groups &&
          <div className={styles.GroupList}>
            {groups.map(group => (
              <GroupListItem key={group._id} group={group} />
            ))}
          </div>
        }

      </div>



      {/* <div className={styles.container}>
        <p>{post}</p>
        <p>{id}</p>
      </div> */}

    </>
  );
}


export async function getServerSideProps() {

  // const param = context.params.id // Get ID from slug `/book/1

  const groups = [

    {
      id: 1,
      name: "T360 Madenler Grubu"
    },

    {
      id: 2,
      name: "T360 Seksenler Grubu"
    },

    {
      id: 3,
      name: "T360 Doksanlar Grubu"
    },

  ]

  //   // Get ID from slug `/book/1
  //   // const id = "333"

  return {
    props: {
      groups,
    },
  }


}


export default P_GroupList;