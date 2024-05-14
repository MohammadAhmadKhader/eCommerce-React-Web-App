import { Link } from 'react-router-dom'

function InvoicesNav() {
  return (
    <nav>
        <Link to={"/dashboard/invoices"}>
            Invoices
        </Link>
    </nav>
  )
}

export default InvoicesNav