import { useSearchParams } from 'react-router-dom'
import CheckboxInput from './CheckboxInput'

const AvailabilityFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const kek: any = {}
  kek.gte = 3
  const handleCheckBox = (event, text) => {
    const available = searchParams.get("available");
    if (!available || available == "false") {
      searchParams.set("available", "true");
      setSearchParams(searchParams);

    } else {
      searchParams.set("available", "false");
      setSearchParams(searchParams);
    }
  }
  const checkStateController = (text) => {
    const doesNameExistInUrl = searchParams.get("available") && searchParams.get("available") == "true" ? true : false
    return doesNameExistInUrl
  }
  return (
    <CheckboxInput id='isAvailable' text='Is Available?' handleCheckBox={handleCheckBox} stateController={checkStateController} />
  )
}

export default AvailabilityFilter