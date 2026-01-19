import { HiBadgeCheck } from "react-icons/hi";
import { FaCalendarCheck } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { VscLightbulbAutofix } from "react-icons/vsc";

const AboutPage = () => {
    return (
    <section>
        <h1 className='text-3xl text-start md:text-4xl -mt-10 mb-8 font-bold max-w-2xl leading-normal' > نحن فريق متخصص بخبرة طويلة في تنفيذ وتوريد أفضل الحلول المتكاملة في:</h1>
        <div className='flex flex-col items-center md:items-stretch  md:flex-row md:flex-wrap justify-center lg:justify-start gap-4 mt-4'>
            <div className='about-segment shadow-2xl'>
                <div className='flex items-center gap-2'>
                    <span className=''>1</span>
                    <h2>تجارة الرخام و الغرانيت</h2>
                </div>
                <div className='flex gap-2 '>
                    <span className='line'></span>
                    <p>
                    نوفر اجود أنواع الرخام الطبيعي والغرانيت المحلي والمستورد،
                    بمواصفات عالية تناسب الأرضيات، الجدران، الواجهات، المطابخ   
                    والمداخل الراقية.
                </p>

                </div>
                
            </div>

            <div className='about-segment shadow-2xl'>
                <div className='flex items-center gap-2'>
                    <span className=''>2</span>
                    <h2>الإكساء الداخلي</h2>
                </div>
                <div className='flex gap-2 '>
                    <span className='line'></span>
                    <p>
                    ننفذ تصاميم داخلية عصرية وكلاسيكية بكافة التفاصيل من
                    الأرضيات و الجدران والأسقف، باستخدام اجود الخامات وتقنيات
                    التشطيب الحديثة.
                    </p>
                </div>
            </div>
            <div className='about-segment shadow-2xl'>
                <div className='flex items-center gap-2'>
                    <span className=''>3</span>
                    <h2>الأعمال الفندقية</h2>
                </div>
                <div className='flex gap-2 '>
                    <span className='line'></span>
                    <p>
                    خبرة في تفيذ مشاريع فندقية شاملة؛ إكساء، تشطيب، تجهيزات
                    داخلية، باسلوب يجمع بين الفخامة والدقة.
                    </p>
                </div>
            </div>
            <div className='about-segment shadow-2xl'>
                <div className='flex items-center gap-2'>
                    <span className=''>4</span>
                    <h2>الأعمال البحرية</h2>
                </div>
                <div className='flex gap-2 '>
                    <span className='line'></span>
                    <p>
                    نقوم بتنفيذ أعمال بحرية متكاملة تشمل الأرصفة، المراسي،
                    واجهات بحرية،مكاسر امواج باستخدام معدات و مواد مقاومة للظروف المناخية البحرية 
                    </p>
                </div>
            </div>
            <div className='w-full  shadow-md backdrop-blur-md bg-background/70 p-2 rounded-lg'>
                <h2 className='text-3xl font-black text-center text-accent '>مع ضمان</h2>
                <div className="flex flex-col md:flex-row 
                                md:[&>span:not(:last-child)]:border-l-2 md:[&>span:not(:last-child)]:border-accent [&>span]:px-4 md:[&>span]:w-1/4 [&>span]:text-center gap-2 ">
                    <span className="flex flex-col items-center gap-1 px-2">
                        <HiBadgeCheck className="w-12 h-12 text-accent"/>
                        <p className="text-xl text-primary font-bold">جودة عالية</p>
                    </span>
                    <span className="flex flex-col items-center gap-1 ">
                        <FaCalendarCheck className="w-12 h-12 text-accent"/>
                        <p className="text-xl text-primary font-bold">التزام بالمواعيد</p>
                    </span>
                    <span className="flex flex-col items-center gap-1 ">
                        <MdDesignServices className="w-12 h-12 text-accent"/>
                        <p className="text-xl text-primary font-bold">تصاميم تفصيلية تناسب كل مشروع</p>
                    </span>
                    <span className="flex flex-col items-center gap-1 ">
                        <VscLightbulbAutofix className="w-12 h-12 text-accent"/>
                        <p className="text-xl text-primary font-bold">استشارات فنية وابتكارات تنفيذية</p>
                    </span>
                </div>

            </div>

        </div>
    </section>
    )
}

export default AboutPage