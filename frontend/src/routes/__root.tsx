import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div>Hello "__root"!</div>
      <h2>it should include navbar </h2>
      <div className='h-10'></div>
      <Outlet />
    </React.Fragment>
  )
}
