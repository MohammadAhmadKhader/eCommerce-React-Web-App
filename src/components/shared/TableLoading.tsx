import TableLineLoading from './TableLineLoading';
const longArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

function TableLoading({LoadingRows,LoadingCols}:{LoadingRows:number,LoadingCols:number}) {
  const usedArray = longArray.slice(0,LoadingRows);
  return (
    usedArray.map((num)=>{
      return (
        <tr key={num}>
          <TableLineLoading LinesAmount={LoadingCols} />
        </tr>
      )
    }
     
    )
    
  )
}

export default TableLoading