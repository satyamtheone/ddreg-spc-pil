import React from 'react';

type PageHeaderProps = {
  title:string
  subTitle?:string
};

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <div className='text-zinc-800 flex flex-col gap-1 my-2'>
      <div className='font-semibold text-2xl'>{props.title}</div>
       <div className='font-normal text-base'>{props.subTitle}</div>
    </div>
  );
};

export default PageHeader;