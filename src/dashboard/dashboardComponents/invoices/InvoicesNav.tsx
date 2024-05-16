import { Link } from 'react-router-dom'

function InvoicesNav() {
  return (
    <nav>
      <Link className='font-semibold' to={"/dashboard/invoices?page=1&limit=20"}>
        Invoices
      </Link>
    </nav>
  )
}

export default InvoicesNav