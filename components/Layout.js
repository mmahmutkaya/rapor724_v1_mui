import AppBar from './AppBar'
import Footer from './Footer'
import FormLogin from './FormLogin'
import FormSignUp from './FormSignUp'
import FormMailTeyit from './FormMailTeyit'
import FormProfile from './FormProfile'
import { useState } from "react";
import { useApp } from "../components/useApp.js";
import styles from '../styles/Layout.module.css'
import Sidebar from './Sidebar'
import SignIn from './Signin'


export default function Layout({ children }) {

  // return <Deneme/>

  const RealmApp = useApp()

  // kullanıcı yüklenememişse logine yönlendirme
  const [loginFormMode, setLoginFormMode] = useState("login")
  const [isSidebar, setIsSidebar] = useState(false)

  if (!RealmApp) {
    return (
      <>
        <div>Üzgünüz, bir problem var, sayfayı yenilemeyi deneyiniz, problem devam ederse lütfen bizi bilgilendiriniz... Hata (COMPONENT:Layout - MESSAGE:RealmApp yok)</div>
      </>
    )
  }

  if (!RealmApp?.currentUser) {
    return (
      <>
        {/* {loginFormMode === "login" && <FormLogin setLoginFormMode={setLoginFormMode} />} */}
        {loginFormMode === "login" && <SignIn setLoginFormMode={setLoginFormMode} />}
        {loginFormMode === "newUser" && <FormSignUp setLoginFormMode={setLoginFormMode} />}
      </>
    )
  }


  // mongo realm bu fonksiyonu name değeri yoksa bile name:$undefined:true gibi birşey oluşturuyor sonuçta $undefined:true olarak döndürüyor
  if (!RealmApp?.currentUser?.customData?.mailTeyit) {
    return (
      <>
        {<FormMailTeyit />}
      </>
    )
  }


  // mongo realm bu fonksiyonu name değeri yoksa bile name:$undefined:true gibi birşey oluşturuyor sonuçta $undefined:true olarak döndürüyor
  const isName = typeof RealmApp?.currentUser?.customData?.name === "string" && RealmApp?.currentUser?.customData?.name.length > 0
  // const mailTeyit = typeof RealmApp?.currentUser.customData.mailTeyit === true
  if (!isName) {
    return (
      <>
        {<FormProfile />}
      </>
    )
  }

  // kullanıcı varsa uygulamayı kullanmaya başlayabiliriz
  if (RealmApp?.currentUser) {
    return (
      <div className={`${styles["layout_container"]}`}>

        <div className={styles.right}>
          <div className={styles.navbar}> {<AppBar setIsSidebar={setIsSidebar} />} </div>
          <div className={styles.page}>{children}</div>
          <div className={styles.footer}> {<Footer />} </div>
        </div>

        <div className={styles.left}><Sidebar setIsSidebar={setIsSidebar} isSidebar={isSidebar} /> </div>

      </div>
    )
  }


}
