import React from 'react'
import { ErrorMessage, Formik, Field, Form } from 'formik';
import styles from '../styles/FormLogin.module.css'

import * as Realm from "realm-web";
import { useApp } from "./useApp.js";



export default function FormLogin({ setLoginFormMode }) {

  const RealmApp = useApp();


  async function clickForm(props) {

    try {

      const { email, password } = props

      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await RealmApp.logIn(credentials);
      if (user) {
        window.location.reload(false);
        return console.log("Giriş işlemi başarılı")
      }
      return console.log("Giriş işlemi başarısız, iletişime geçiniz.")

    } catch (err) {

      const hataMesaj = err.error

      if (hataMesaj.includes("expected a string 'password' parameter")) {
        return console.log("Şifre girmelisiniz")
      }

      if (hataMesaj === "invalid username") {
        return console.log("Email girmelisiniz")
      }

      if (hataMesaj === "invalid username/password") {
        return console.log("Email ve şifre uyuşmuyor")
      }

      console.log(hataMesaj)
      return console.log("Giriş esnasında hata oluştu, lütfen iletişime geçiniz..")

    }

  }


  async function changeForm() {
    try {
      setLoginFormMode("newUser")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.form_container}>
      <h1>Üye Girişi</h1>

      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={clickForm}
      >
        <Form className={styles.form}>

          {/* <label className={styles.label} htmlFor="firstName">İsim</label> */}
          <Field className={styles.input} id="email" name="email" placeholder="Email" />

          {/* <label className={styles.label} htmlFor="lastName">Soyisim</label> */}
          <Field className={styles.input} id="password" name="password" placeholder="Şifre" />

          <button className={styles.buttonLogin} type="submit">Giriş Yap</button>
          <button className={styles.buttonRegester} type="change" onClick={changeForm}>Üye Ol</button>
        </Form>
      </Formik>


    </div>
  )
}