import { useContext } from 'react'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'
import { Link } from 'react-router-dom';
import HeartIcon from '../shared/HeartIcon';
import { ISingleProduct } from '../../types/types';

function SingleProduct({ Img, Description, Title, CustomStyles, CustomStylesImg, Price }: ISingleProduct) {
    const { theme } = useContext(ThemeContext);
    return (
        <Link to="/products/1" className={'block border pb-2 rounded-xl'}
            style={{
                backgroundColor: theme == "dark" ? "var(--dark--bgCard-color)" : "var(--light--bgCard-color)",
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                boxShadow: theme == "dark" ? "var(--dark--boxShadowCard)" : "var(--light--boxShadowCard)",
                ...CustomStyles
            }}>
            <div>
                <img className='rounded-t-xl w-full object-cover' src={Img} alt="image holder"
                    style={{
                        ...CustomStylesImg
                    }} />
            </div>

            <div className='px-2.5 mt-1 flex justify-between gap-y-1 h-[150px]'>
                <div className='mt-2'>
                    <h3 className='line-clamp-2 text-left text-lg md:text-xl font-semibold'>{Title}</h3>
                    <h3 className='line-clamp-2 mt-2 text-left' style={{ lineBreak: "anywhere" }}>{Description}</h3>
                    <p className='font-semibold mt-1 text-left'>${Price}</p>
                </div>
                <div className='mt-2 mx-0.5'>
                    <HeartIcon />
                </div>
            </div>
        </Link>
    )
}

export default SingleProduct