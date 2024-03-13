import { useContext } from 'react'
import { ThemeContext } from '../../../features/ThemeFeature/ThemeProvider';
import SingleOrder from './SingleOrder';

function SingleOrderDetails() {
    const { theme } = useContext(ThemeContext)
    return (
        <div>
            <div>
                <div className='border-b my-2' style={{
                    borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                }}>
                    <h4 className='text-xl py-2'>
                        Product Name
                    </h4>
                </div>
            </div>
            <div className='flex flex-col gap-y-2'>
                <SingleOrder imgUrl='' price={50.21} name={'Casio WaterProof'} quantity={3} />
                <SingleOrder imgUrl='' price={20.43} name={'Handbag'} quantity={2} />
                <SingleOrder imgUrl='' price={32.1} name={'GoldenWatch'} quantity={1} />
                <SingleOrder imgUrl='' price={9.89} name={'PersonalCare'} quantity={4} />
            </div>

            <div>

            </div>
        </div>
    )
}

export default SingleOrderDetails