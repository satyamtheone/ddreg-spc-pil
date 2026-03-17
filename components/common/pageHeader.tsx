import React from 'react';

type PageHeaderProps = {};

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <div className='text-zinc-800 flex flex-col gap-1 my-2'>
      <div className='font-semibold text-2xl'>My Account</div>
       <div className='font-normal text-base'>Stay updated with latest regulatory changes</div>
    </div>
  );
};

export default PageHeader;