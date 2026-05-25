import Link from 'next/link'
import { getAboutContent } from '@/lib/about/get-about-content'
import { AboutContent } from '@/lib/about/types'
import { ActivityTabs } from '@/components/about/ActivityTabs'
import { WhyChooseAccordion } from '@/components/about/WhyChooseAccordion'

export const dynamic = 'force-dynamic'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = (await getAboutContent(locale as 'vi' | 'ja')) as AboutContent

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <img
          alt="Team"
          className="w-full h-full object-cover"
          src={content.heroImage}
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <button className="play-overlay w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
          </button>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="container mx-auto px-6 lg:px-20 -mt-20 relative z-10 mb-24">
        <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] py-10 px-8 flex flex-wrap justify-between items-center text-center">
          {content.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`w-1/2 md:w-1/4 mb-6 md:mb-0 ${
                idx < content.stats.length - 1 ? 'border-r border-gray-100' : ''
              }`}
            >
              <span className="text-4xl font-bold text-teal-text hover:text-pink transition-colors cursor-default mb-2 block">
                {stat.value}
              </span>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Our Company Section */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">{content.ourStory.title}</h2>
            <p className="text-gray-600 leading-relaxed">
              {content.intro}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <img
                alt="Company Event"
                className="rounded-2xl w-full object-cover h-[500px]"
                src={content.ourStory.image}
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold mb-6">{content.ourStory.title}</h3>
              <div className="space-y-4 text-gray-600">
                {content.ourStory.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <Link
                href={`/${locale}/jobs`}
                className="mt-8 border border-teal-text text-teal-text font-medium py-2 px-8 rounded-full hover:border-pink hover:bg-pink hover:text-white transition-colors inline-block"
              >
                {content.cta.buttonLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{locale === 'vi' ? 'Các hoạt động nổi bật' : '主な活動'}</h2>
            <p className="text-gray-600">
              {locale === 'vi' ? 'Cùng khám phá những hoạt động thú vị tại Fabbi.' : 'Fabbiでの興味深い活動を一緒に探検しましょう。'}
            </p>
          </div>
          <ActivityTabs activities={content.activities} />
        </div>
      </section>

      {/* Why Choose Fabbi Section */}
      <section className="py-24 bg-[#e6f4f5]/30 relative overflow-hidden">
        {/* Decorative dashed circle */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 opacity-20 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#008b9c" strokeWidth="2" strokeDasharray="8 6"/>
          </svg>
        </div>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-full md:w-1/2 relative">
            <img
              alt="Employee"
              className="w-full max-w-md mx-auto relative z-10"
              src={content.whyChoose.employeeImage}
            />
            <div className="absolute top-10 right-0 bg-white p-4 rounded-xl shadow-md text-sm text-gray-600 max-w-[200px] z-20">
              {content.whyChoose.bubbleSender}
            </div>
            <div className="absolute top-32 right-10 bg-pink p-4 rounded-xl shadow-md text-sm text-white max-w-[180px] z-20">
              {content.whyChoose.bubbleReceiver}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{content.whyChoose.title}</h2>
            <p className="text-gray-600 mb-8">
              {content.whyChoose.description}
            </p>
            <div className="space-y-4">
              <WhyChooseAccordion highlights={content.highlights} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - REMOVED */}
    </div>
  )
}
