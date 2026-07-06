import SectionHeading from "@/components/SectionHeading";
import { socials } from "@/data/portfolio";

export default function ContactSection() {
  return (
    <section
      className="responsive-section scroll-fade scroll-mt-24 px-4 sm:px-6 lg:px-8"
      id="contact"
    >
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading subtitle="say hello" title="Contact" />

        <p className="mx-auto max-w-xl text-xl font-semibold leading-8 text-zinc-800 dark:text-zinc-100 sm:text-2xl">
          Let’s build something cool together.
        </p>

        <nav
          aria-label="Contact links"
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          {socials.map((social) => (
            <a
              className="comic-action inline-flex min-h-11 items-center gap-2 px-4 text-sm font-semibold"
              href={social.href}
              key={social.label}
              rel="noreferrer"
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
            >
              <img alt="" className="h-5 w-5 object-contain" src={social.icon} />
              {social.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
