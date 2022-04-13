import * as React from 'react'
import { Button } from '@/src/components';
import './buttom.scss';

export interface Props {
  name?: string
}

export function ButtonRender(props: Props) {
  console.log('props', props);

  return (
    <>
      <div className="ButtonRender">
        <div className="one">
          <Button btnType='default'> 按钮 </Button>
          <Button btnType='primary'> 按钮 </Button>
          <Button btnType='link'> 按钮 </Button>
          <Button btnType='icon'> 按钮 </Button>
          <Button btnType='link-default'> 按钮 </Button>
          <Button btnType='default-link'> 按钮 </Button>
          <Button btnType='link-primary'> 按钮 </Button>
          <Button btnType='primary-link'> 按钮 </Button>
        </div>

        <div className="two">
          <Button btnType='default' size='small'> 按钮 </Button>
          <Button btnType='default' size='normal'> 按钮 </Button>
          <Button btnType='default' size='large'> 按钮 </Button>
        </div>

        <div className="three">
           <Button btnType='default' withArrow = 'enable'> 按钮 </Button>
           <Button btnType='default' withArrow = 'disable'> 按钮 </Button>
           <Button btnType='default' withArrow = 'pc-only'> 按钮 </Button>
           <Button btnType='default' withArrow = 'm-only'> 按钮 </Button>
        </div>

      </div>

    </>
  )
}
