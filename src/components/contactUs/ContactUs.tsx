import { useContext, useRef } from 'react'
import Input from '../shared/Input'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider';
import Joi from "joi";
import { tlds } from '@hapi/tlds';
import { joiResolver } from '@hookform/resolvers/joi';
import { ContactUsMessage } from '../../types/types';
import useAxios from '../customHooks/useAxios';
import { toast } from 'react-toastify';

const schema = Joi.object({
  fullName: Joi.string().min(4).max(32),
  email: Joi.string().email({ tlds: { allow: tlds } }).min(7).max(64),
  subject: Joi.string().min(4).max(32),
  message: Joi.string().min(4).max(256),
})

function ContactUs() {
  const loadingToastRef = useRef(null)
  const { theme } = useContext(ThemeContext)
  const { POST } = useAxios()
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactUsMessage>({
    resolver: joiResolver(schema)
  });


  const onSubmit: SubmitHandler<ContactUsMessage> = async (submittedData) => {
    try {
      loadingToastRef.current = toast.loading("Hold on, we are sending your message...");
      const { data } = await POST("/contactUs", {
        fullName: submittedData.fullName,
        message: submittedData.message,
        subject: submittedData.subject,
        email: submittedData.email
      })

      if (data["message"] == "success") {
        toast.success("Your message has been sent successfully!")
      }

    } catch (error) {

      toast.error("Something Went Wrong Please Try Again Later!")
      console.log(error)
    } finally {
      toast.dismiss(loadingToastRef.current);
    }
  }
  return (
    <section className='px-4 my-5'>
      <div className='max-w-[1000px] mx-auto my-20'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-semibold'>Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='my-8'>
          <Input register={register} title={"Full Name :"} id={'name'} errors={errors} trigger={trigger}
            name={"fullName"} placeholder={'full name'} type={'text'} />

          <Input register={register} title={"Email :"} id={'email'} errors={errors} trigger={trigger}
            name={"email"} type={'email'} placeholder={'email'} />

          <Input register={register} title={"Subject :"} id={'subject'} errors={errors} trigger={trigger}
            name={"subject"} type={'text'} placeholder={'subject'} />

          <div className='flex flex-col gap-y-2'>
            <label htmlFor='message'>Message :</label>
            <textarea {...register("message")} className='border rounded-md resize-none p-2' rows={10} name="message" id="message"
              placeholder='Message...'
              style={{
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
              }} />
          </div>
          <div className='text-right'>
            <button type='submit' disabled={isSubmitting}
              className='px-8 py-1 bg-color-accent border border-color-accent rounded-md
               text-white duration-300 hover:bg-transparent hover:text-color-accent text-sm font-semibold my-2
               disabled:hover:bg-color-accent disabled:hover:text-white
               '>
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactUs
