import { LinearProgress } from '@mui/joy'
const longArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

function TableLineLoading({LinesAmount}:{LinesAmount:number}) {
    const usedArray = longArray.slice(0,LinesAmount);
  return (
    usedArray.map((num)=>{
        return (
            <td key={num}>
                <div className='my-2'>
                    <LinearProgress />
                </div>
            </td>
        )
    })
  )
}

export default TableLineLoading