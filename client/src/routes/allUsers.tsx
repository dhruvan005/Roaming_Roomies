import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/allUsers')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/allUsers"!</div>
}
