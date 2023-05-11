import React from 'react'
import FormGroupEdit from "../../../../components/FormGroupEdit"
import { useRouter } from 'next/router'


export default function P_GroupEdit() {
  
  const { asPath } = useRouter()
  const pathArray = asPath.split("/");
  // console.log(pathArray)

  return (
    <FormGroupEdit groupId={pathArray[2]}/>
  )

}