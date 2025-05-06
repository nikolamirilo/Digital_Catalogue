import React from 'react'

const page = async ({params}: {params:{name:string}}) => {
const name = await params.name
  return (
    <div>{name}</div>
  )
}

export default page