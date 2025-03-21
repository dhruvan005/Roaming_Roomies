import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

export const Route = createFileRoute('/_authenticated/HouseListing')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">House Listing</h1>
      <div className="text-xl text-gray-600 mb-4">
        Page is Under Construction
      </div>
      <p className="text-gray-500 max-w-md text-center mb-8">
        We are working hard to bring you an amazing house listing experience.
        Please check back soon for exciting updates!
      </p>
      <Link to="/">
        <Button 
          type="primary" 
          size="large"
          icon={<HomeOutlined />}
          className="flex items-center gap-2 hover:opacity-90"
        >
          Back to Home
        </Button>
      </Link>
    </div>
  )
}