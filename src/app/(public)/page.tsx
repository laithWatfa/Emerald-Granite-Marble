import Link from 'next/link'
const Landing = () => {
  return (
    <>
            <h1 className='text-5xl md:text-6xl font-bold max-w-2xl leading-tight'>حلول الرخام و الجرانيت الفاخرة</h1>
            <p className='text-2xl font-normal'>توريد الرخام و الجرانيت عال الجودة للمشاريع <br/> السكنية والتجارية والمعمارية.</p>
            <div className='flex flex-wrap gap-2 mt-4 justify-center md:justify-start'>
                <Link
                    href={"/stones"}
                    className='button'
                >
                    استعرض منتجاتنا
                </Link>
                <Link
                    href={"/contact"}
                    className='outlined-button'
                >
                    تواصل معنا
                </Link>
            </div>
    </>
  )
}

export default Landing