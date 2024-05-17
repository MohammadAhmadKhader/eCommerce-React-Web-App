import { Link } from 'react-router-dom'

function InvoicesNav() {
  return (
    <nav className='flex flex-col gap-y-2 border-t border-opacity-10 py-2'>
      <Link className='font-semibold' to={"/dashboard/invoices?page=1&limit=20"}>
        Invoices
      </Link>
    </nav>
  )
}

export default InvoicesNav