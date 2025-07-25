import React from 'react'

const page = async ({ params }: { params: Promise<{ showcase: string }> }) => {
  const {showcase} = await params;
  return (
    <div>Showcase {showcase}</div>
  );
}

export default page