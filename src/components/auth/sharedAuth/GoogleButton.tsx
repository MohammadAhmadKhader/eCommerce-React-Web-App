import { FcGoogle } from 'react-icons/fc';

interface IGoogleButton {
    onClick:(...args)=>any;
    isDisabled:boolean;
    text:string;
}

function GoogleButton({onClick,isDisabled,text}:IGoogleButton) {
  return (
    <button
        type="button"
        className={`group w-full rounded-3xl border-color-accent border duration-300 hover:bg-color-accent
        disabled:hover:bg-transparent disabled:opacity-65`}
        onClick={() => {
            onClick()
        }}
        disabled={isDisabled}>
        <span className='flex items-center py-1.5 mx-auto w-fit gap-x-2'>
            <div className="group-disabled:group-hover:bg-transparent group-hover:bg-white rounded-full duration-300">
                <FcGoogle size={25} />
            </div>
            <span className='group-disabled:group-hover:text-inherit font-semibold group-hover:text-white'>{text}</span>
        </span>
    </button>
  )
}

export default GoogleButton