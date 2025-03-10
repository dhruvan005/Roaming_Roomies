import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/roomListing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/roomListing"!</div>
}
