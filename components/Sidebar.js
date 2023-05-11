import React, { useState } from 'react'
import styles from "../styles/Sidebar.module.css"
import Link from 'next/link'

const Sidebar = ({ isSidebar, setIsSidebar }) => {

  // const [isSidebar, setIsSidebar] = useState(false)

  function toggleSidebar() {
    setIsSidebar((prev) => !prev)
  }

  function clickOverlay() {
    console.log("kliked overlay")
    setIsSidebar((prev) => !prev)
  }

  function clickSidebarMenu() {
    console.log("kliked sidebar menu")
    setIsSidebar((prev) => !prev)
  }

  return (

    <div className={!isSidebar ? styles.sidebar : styles.sidebar + " " + styles.sidebar__active} >

      <div className={!isSidebar ? styles.sidebar__overlay : styles.sidebar__overlay + " " + styles.sidebar__overlay__active} onClick={clickOverlay}></div>

      <div className={!isSidebar ? styles.sidebar__menu : styles.sidebar__menu + " " + styles.sidebar__menu__active} onClick={clickSidebarMenu}>
        
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/groups">Gruplar</Link>
          </li>
        </ul>

      </div>


      {/* <div className={styles.sidebar__button} onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </div> */}

    </div>


  )
}

export default Sidebar