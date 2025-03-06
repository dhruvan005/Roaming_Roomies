import * as React from 'react'
import { Button } from '@carbon/react'
import { createFileRoute } from '@tanstack/react-router'



export const Route = createFileRoute('/')({
  component: HomeComponent,
})


import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';



function HomeComponent() {
  return (
    <div className="p-2 bg-amber-400">
     
      <h3>Welcome Home!</h3>
     
    </div>
  )
}
