import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/book')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
        </div>
    )
}
