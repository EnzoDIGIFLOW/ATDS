'use client'

import { useState, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Mail, MapPin, Phone, Clock, Send, Facebook, Instagram } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'

export default function ExperienceSection() {
  const { t, language } = useLanguage()
  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section
      id="contact"
      ref={contactRef}
      className={`relative py-20 bg-gray-900 text-white overflow-hidden transition-all duration-1000 ease-in-out ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-800 ease-in-out ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-temple-pink bg-clip-text text-transparent">
            {t.contact.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Form */}
          <div className={`transition-all duration-800 ease-in-out h-full ${contactInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`} style={{ transitionDelay: "200ms" }}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-temple-pink/20 rounded-lg mr-4">
                  <Mail className="w-6 h-6 text-temple-pink" />
                </div>
                <h3 className="text-2xl font-bold">{t.contact.form.send}</h3>
              </div>
              <form className="space-y-6 flex-grow">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <Input
                      placeholder={t.contact.form.namePlaceholder}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12 rounded-xl transition-all duration-300 ease-in-out focus:bg-gray-700 focus:border-temple-pink focus:shadow-lg focus:shadow-temple-pink/20 group-hover:border-gray-500"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-temple-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  <div className="relative group">
                    <Input
                      placeholder={t.contact.form.emailPlaceholder}
                      type="email"
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12 rounded-xl transition-all duration-300 ease-in-out focus:bg-gray-700 focus:border-temple-pink focus:shadow-lg focus:shadow-temple-pink/20 group-hover:border-gray-500"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-temple-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>
                <div className="relative group">
                  <Input
                    placeholder={t.contact.form.phonePlaceholder}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-12 rounded-xl transition-all duration-300 ease-in-out focus:bg-gray-700 focus:border-temple-pink focus:shadow-lg focus:shadow-temple-pink/20 group-hover:border-gray-500"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-temple-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div className="relative group">
                  <Textarea
                    placeholder={t.contact.form.messagePlaceholder}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-xl transition-all duration-300 ease-in-out focus:bg-gray-700 focus:border-temple-pink focus:shadow-lg focus:shadow-temple-pink/20 group-hover:border-gray-500 resize-none"
                    rows={5}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-temple-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <Button className="w-full h-14 bg-gradient-to-r from-temple-pink to-pink-400 hover:from-pink-400 hover:to-temple-pink text-gray-900 font-bold text-lg rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-temple-pink/30 transform">
                  <Send className="w-5 h-5 mr-2" />
                  {t.contact.form.send}
                </Button>
              </form>
            </div>
          </div>
          {/* Contact Info */}
          <div className={`space-y-6 transition-all duration-800 ease-in-out h-full ${contactInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} style={{ transitionDelay: "400ms" }}>
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  title: t.contact.info.location,
                  content: "2010 Av. de la Croix d'Or\n13320 Bouc-Bel-Air",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "bg-blue-500/20"
                },
                {
                  icon: Phone,
                  title: t.contact.info.phone,
                  content: "06 61 38 75 45",
                  color: "from-green-500 to-green-600",
                  bgColor: "bg-green-500/20"
                },
                {
                  icon: Clock,
                  title: t.contact.info.hours,
                  content: "Mar - Sam: 11h30 - 14h00, 18h00 - 22h00\nDimanche: 18h00 - 22h00\nLundi: Fermé",
                  color: "from-orange-500 to-orange-600",
                  bgColor: "bg-orange-500/20"
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 ease-in-out hover:transform hover:scale-[1.02] hover:shadow-lg cursor-pointer ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 ${item.bgColor} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`w-6 h-6 text-temple-pink`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-temple-pink transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 whitespace-pre-line leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Social Media Section */}
            <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-all duration-800 ease-in-out ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "1050ms" }}>
              <h3 className="text-xl font-bold mb-4 text-center">{t.footer.followUs}</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href="https://www.facebook.com/share/19UwPk6Ejc/?mibextid=wwXIfr" className="group p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 flex items-center justify-center">
                  <Facebook className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                </a>
                <a href="https://www.instagram.com/autempledusushi__/" className="group p-3 bg-pink-600/20 hover:bg-pink-600/30 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-pink-500/20 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-pink-400 group-hover:text-pink-300 transition-colors duration-300" />
                </a>
                <a href="https://www.tiktok.com/@au.temple.du.sushi?_t=ZN-8yW8HFTq4ta&_r=1" className="group p-3 bg-gray-900 hover:bg-gray-900/30 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-gray-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white group-hover:text-gray-200 transition-colors duration-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
                <a href="https://g.co/kgs/uvnoQDs" className="group p-3 bg-yellow-600/20 hover:bg-yellow-600/30 rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/20 flex items-center justify-center">
                  <Image src="/google.svg" alt="google" width={26} height={26} className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                </a>
              </div>
              <p className="text-center text-gray-400 text-sm mt-3">
                Facebook • Instagram • Tiktok • Google Business
              </p>
            </div>
          </div>
        </div>
        {/* Google Maps GMB - Full Width Below */}
        <div
          className={`mt-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 transition-all duration-800 ease-in-out hover:border-gray-600/50 ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "1200ms" }}
        >
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
              <MapPin className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold">{language === 'fr' ? 'Nous Trouver' : 'Find Us'}</h3>
          </div>
          <div className="rounded-xl overflow-hidden h-80 relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4099.657450652335!2d5.395389176969172!3d43.44936186558957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c99366e46187f9%3A0x5562ae9155d32d69!2sAu%20temple%20du%20sushi!5e1!3m2!1sfr!2sfr!4v1754385007549!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Au Temple du Sushi"
              className="transition-all duration-300 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-temple-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}