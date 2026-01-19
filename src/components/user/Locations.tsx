import { FaLocationDot } from "react-icons/fa6";

export default function Locations() {
  return (
    <section className="py-4 px-6 bg-background/70 backdrop-blur-md rounded-lg w-full  mx-auto ">
        <h2 className="text-4xl font-bold mb-6 text-accent text-center">فروعنا</h2>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Branch 1 */}
        <div className="flex flex-col gap-2">
          <h3 className="flex gap-2 items-center text-xl font-semibold text-primary">
            <FaLocationDot className="w-6 h-6" />
            فرع ١ : دمشق عدرا الصناعية.
            </h3>
          <div className="flex gap-4 ">
            <a
              href="https://maps.app.goo.gl/voQxwDmGoqgtV4YT7"
              target="_blank"
              className="button"
            >
                فتح الخريطة
            </a>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=123+Marble+Street"
              target="_blank"
              className="outlined-button hover:text-accent! hover:border-accent!"
            >
              الحصول على الاتجاهات
            </a>
          </div>

        <iframe 
            title="موقع فرع دمشق عدرا الصناعية"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106326.86897849447!2d36.5766191!3d33.6127074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518f50607485fd9%3A0xc482143fee37a083!2sAdra%20Industrial%20City%2C%20Syria!5e0!3m2!1sen!2snl!4v1767378715762!5m2!1sen!2snl" 
            loading="lazy"
            className="w-full h-40 border-2 border-primary rounded-md" 
            ></iframe>
        </div>

        {/* Branch 2 */}
        <div className="flex flex-col gap-2">
          <h3 className="flex gap-2 items-center text-xl font-semibold text-primary">
            <FaLocationDot className="w-6 h-6" />
            فرع ٢ : مصياف .</h3>
          <div className="flex  gap-4">
            <a
              href="https://maps.app.goo.gl/pjAgr2MN29SjBJL2A"
              target="_blank"
              className="button"
            >
               فتح الخريطة
            </a>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=35.121281,36.400934"
              target="_blank"
              className="outlined-button hover:text-accent! hover:border-accent!"
            >
               الحصول على الاتجاهات
            </a>
          </div>

          <iframe 
            title="موقع فرع مصياف"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d6526.856913242383!2d36.3983736216736!3d35.12098002011982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDA3JzE2LjYiTiAzNsKwMjQnMDMuNSJF!5e0!3m2!1sen!2sro!4v1768693371511!5m2!1sen!2sro" 
            loading="lazy"
            className="w-full h-40 border-2 border-primary rounded-md"
            >
          </iframe>
        </div>

      </div>
    </section>
  );
}
