import { Mail, Phone, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { education, profile } from '../data/resume'
import { GithubIcon, LinkedinIcon } from './icons'
import SectionHeading from './SectionHeading'
import { Button } from './ui/button'

export default function Contact() {
  const [sent, setSent] = useState(false)

  // FormSubmit redirects back with ?sent=1 after a successful post
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('sent') === '1') {
      setSent(true)
    }
  }, [])

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionHeading index="05" kicker="CONTACT" title="Open a query." />

      <div className="grid gap-6 md:grid-cols-5">
        {/* contact form — posts straight to Yash's inbox via FormSubmit */}
        <div className="reveal glass card-lift rounded-xl p-8 md:col-span-3 md:p-10">
          <p className="font-mono text-sm text-neon">
            <span className="text-slate-600">$</span> send --to yash --subject "opportunity"
          </p>
          <h3 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Have data that needs <span className="text-gradient">making sense of</span>?
          </h3>

          {sent ? (
            <div className="mt-8 rounded-lg border border-mint/40 bg-mint/10 p-5 font-mono text-sm text-mint">
              ✓ message.transmitted() — thanks! I'll get back to you shortly.
            </div>
          ) : (
            <form
              action="https://formsubmit.co/yashbarot499@gmail.com"
              method="POST"
              className="mt-8 space-y-4"
            >
              {/* formsubmit config */}
              <input type="hidden" name="_subject" value="📬 Portfolio — new message" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_next"
                value="https://yashdbarot.github.io/portfolio/?sent=1"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input className="field" name="name" placeholder="your_name" required />
                <input className="field" type="email" name="email" placeholder="your@email.com" required />
              </div>
              <textarea
                className="field min-h-32 resize-y"
                name="message"
                placeholder="> type your message here…"
                required
              />
              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" variant="neon" size="lg">
                  transmit() <Send className="h-4 w-4" />
                </Button>
                <p className="font-mono text-[11px] leading-snug text-slate-600">
                  first message triggers a one-time FormSubmit
                  <br />
                  activation email — just click it once
                </p>
              </div>
            </form>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-400/10 pt-6">
            <Button as="a" href={`mailto:${profile.email}`} variant="ghost" size="sm">
              <Mail className="h-4 w-4" /> {profile.email}
            </Button>
            <Button as="a" variant="outline" size="icon" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon className="h-5 w-5" />
            </Button>
            <Button as="a" variant="outline" size="icon" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon className="h-5 w-5" />
            </Button>
            <span className="flex items-center gap-2 font-mono text-sm text-slate-500">
              <Phone className="h-4 w-4 text-slate-600" /> {profile.phone}
            </span>
          </div>
        </div>

        {/* education card */}
        <div className="reveal glass card-lift rounded-xl p-8 md:col-span-2">
          <p className="font-mono text-xs tracking-widest text-slate-500">EDUCATION.LOG</p>
          <h4 className="mt-4 font-display text-xl font-semibold text-slate-100">
            {education.degree}
          </h4>
          <p className="mt-2 text-sm text-slate-400">{education.school}</p>
          <p className="mt-1 font-mono text-xs text-neon/80">{education.period}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {education.coursework.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
