import React from 'react'
import { ErrorMessage, Formik, Field, Form } from 'formik';
import styles from '../styles/FormGroupCreate.module.css'
import { useApp } from "./useApp.js";
import { useQuery } from '@tanstack/react-query'

export default function FormGroupCreate({ setShow, refetch_groups }) {

  const RealmApp = useApp();

  

  async function clickForm({ groupName }) {

    try {

      const result = await RealmApp.currentUser.callFunction("createGroup", { name:groupName });

      console.log(result)
      refetch_groups()
      return setShow("Groups")
      
    } catch (err) {

      const hataMesaj = err.error ? err.error : err

      if (hataMesaj.includes("duplicate key error")) {
        return console.log("Bu grup adı sistemde kayıtlı, grup adınızın başına proje, firma, şube vb. ilaveler ekleyerek özelleştirebilirsiniz.")
      }

      return console.log(hataMesaj)
    }

  }


  async function changeForm() {
    try {
      setShow("Groups")
    } catch (err) {
      console.log(err)
    }
  }

  return (

    <div className={styles.form_container}>
      <h1>Yeni Grup Oluştur</h1>

      <Formik
        initialValues={{
          groupName: '',
        }}
        onSubmit={clickForm}
      >
        <Form className={styles.form}>

          {/* <label className={styles.label} htmlFor="firstName">İsim</label> */}
          <Field className={styles.input} id="groupName" name="groupName" placeholder="Grup Adı Giriniz" />

          <button className={styles.button1} type="submit">Kaydet</button>
          <button className={styles.button2} type="change" onClick={changeForm}>Kapat</button>
        </Form>
      </Formik>


    </div>
  )
}
