import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/LegalDocument";
import { AppCta } from "@/components/ui";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Travela handles your data in the app and on this website, what we collect and why, who else is involved, and how to see, fix or delete it.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    paragraphs: [
      "Travela is a free travel app for Kenya. It covers all 47 counties and 188 places, and it keeps working when you lose signal.",
      "For data protection, Travela is the controller of the personal data described here. That means we decide why it is used and how it is handled.",
      `We are based in ${contact.location}. You can reach us at ${contact.email} or on ${contact.phone}.`,
    ],
  },
  {
    id: "what-we-collect",
    heading: "What we collect and why",
    paragraphs: [
      "We keep this short. We collect what the app needs to work for you and nothing more.",
      "Account details. When you create an account you give us an email address. You can also add a display name and a profile picture. We use these to sign you in and to keep your progress as yours. Accounts are made with an email address or with Google, and there is one account per email address.",
      "Your progress. Visits and stamps, trips and their stops, favourites, badges and experience are saved to your account. This is what lets your progress follow you to a new phone. If you never sign in, this stays on the device and is not sent anywhere.",
      "Photos and notes. If you attach a photo or a note to a trip, it is stored with your account. If you attach nothing, we store nothing.",
      "These are the other things we collect, each read only in the moment it is needed.",
    ],
    bullets: [
      "Location: read only at the moment you ask for what is nearby, and used to sort the list. It is not stored and there is no background tracking.",
      "Error reports: if the app hits a problem it can send a short report to our email. Tokens, passwords, one time codes and personal identifiers are masked before the report leaves your device.",
      "Waitlist (website): if you join the waitlist we collect your email address and, if you give them, your name and a county you are interested in.",
      "Website contact form: your name, your email address and your message, so we can reply.",
    ],
  },
  {
    id: "how-we-use-it",
    heading: "How we use it",
    paragraphs: [
      "We use your data only to run Travela for you. We do not use it for advertising, and we do not sell or rent it. There is no ad network in the app.",
      "The specific uses are:",
    ],
    bullets: [
      "To create and run your account and let you sign in.",
      "To store your progress, photos and notes so they come back when you sign in on another device.",
      "To show places, counties and events that fit what you set.",
      "To send one launch email if you joined the waitlist.",
      "To send account email such as confirmation and password resets.",
      "To keep the service secure, stop spam and abuse, and fix faults.",
      "To understand, in aggregate, how the website is used so we can improve it.",
    ],
  },
  {
    id: "legal-basis",
    heading: "Our legal basis",
    paragraphs: [
      "Kenya's Data Protection Act 2019 requires us to have a lawful reason before we use your data. We rely on three.",
      "Consent. We ask you first before reading your location, before adding you to the waitlist, before sending notifications and before you add optional profile details. You can withdraw consent at any time.",
      "Performance of a contract. We need your email address and your progress to give you the account you asked for and to keep it working across devices.",
      "Legitimate interests. We use a small amount of data to keep Travela secure, to prevent abuse and spam, and to fix faults, in ways that do not override your rights.",
      "In plain terms: if we do not have one of these reasons, we do not use your data.",
    ],
  },
  {
    id: "waitlist",
    heading: "The waitlist",
    paragraphs: [
      "This website has a waitlist for people who want to hear when the app is ready.",
      "If you join, we collect your email address and, if you choose to give them, your name and a county you are interested in. We store them with Brevo, our email provider, and we use them to send you one launch email.",
      "We do not add you to any other list. You can ask us to take you off at any time by writing to us or calling us, and we will remove you. Once the launch email has gone, we delete waitlist details within 30 days.",
    ],
  },
  {
    id: "third-parties",
    heading: "Who else is involved",
    paragraphs: [
      "A few trusted providers help us run Travela. Here is what each one receives.",
    ],
    bullets: [
      "Supabase holds accounts and app data. It receives your email address, your optional display name and profile picture, and your progress, photos and notes. It also handles sign in.",
      "Google sign in. If you choose to continue with Google, Google confirms who you are and passes your name, email address and profile picture to us. Google does not receive your trips, photos or notes.",
      "Brevo sends account and notification email and holds the waitlist. It receives your email address and, if you gave them, your waitlist name and county.",
      "Vercel hosts this website. It processes the requests that reach the site. Vercel Analytics records aggregate page views and does no advertising.",
      "Cloudflare Turnstile guards the website forms against spam. It receives the signals it needs to tell a person from a bot.",
      "Google Play distributes the Android app. Google handles the download and the device and account data involved in running Play, under Google's own privacy policy.",
    ],
  },
  {
    id: "photos-and-copyright",
    heading: "Photos and copyright",
    paragraphs: [
      "Travela does not own the photographs of the places shown in the app and on this website. They are used only to illustrate the destinations, and the copyright in each photograph stays with the photographer or other rights holder who created it. All rights in those photographs are reserved by their owners.",
      "We claim no ownership of these pictures, and we do not sell or license them. If you are a photographer or rights holder and you believe a picture has been used without permission, or with the wrong credit, write to us and we will credit it properly or take it down promptly.",
    ],
  },
  {
    id: "cookies-and-analytics",
    heading: "Cookies and analytics",
    paragraphs: [
      "The website uses a small amount of cookie or similar storage. Vercel Analytics records aggregate page views without cookies and without advertising, so it cannot follow you around the web. Cloudflare Turnstile may use a cookie to tell people from bots before a form is sent.",
      "The app has no advertising cookies. It keeps your sign in session on the device so you do not have to sign in every time, and signing out removes that session.",
      "You can block or clear cookies in your browser. Reading the website will still work; some forms may need the spam check to pass.",
    ],
  },
  {
    id: "retention",
    heading: "How long we keep it",
    paragraphs: [
      "We keep each kind of data only as long as we need it. When your account is deleted, a copy may briefly remain in an encrypted backup before it is overwritten on our normal cycle.",
    ],
    bullets: [
      "Account and profile: for as long as your account exists, then deleted within 30 days of a verified request.",
      "Progress, including visits and stamps, trips and stops, favourites, badges and experience: for as long as your account exists, and deleted with it.",
      "Photos and notes: for as long as your account exists, or until you remove them, whichever is sooner.",
      "Location: not stored at all.",
      "Waitlist details: until the launch email has gone, then deleted within 30 days, or sooner if you ask.",
      "Error reports: kept for no more than 90 days.",
      "Website analytics: aggregate only and not tied to you.",
    ],
  },
  {
    id: "international-transfers",
    heading: "Where your data is held",
    paragraphs: [
      "Some of our providers, including Supabase, Vercel, Brevo, Google and Cloudflare, operate globally. Your data may be stored or processed outside Kenya.",
      "When data leaves Kenya we rely on the protections these providers put in place, such as encryption in transit and contractual safeguards. We only use providers we believe meet the standard Kenya's Data Protection Act expects for a transfer abroad.",
      "In plain terms: your data may sit on servers outside Kenya, but it stays protected and it is never ours to sell.",
    ],
  },
  {
    id: "security",
    heading: "How we protect it",
    paragraphs: [
      "We take reasonable steps to keep your data safe. No system is perfect, and if we become aware of a breach that affects you we will tell you and the Office of the Data Protection Commissioner as the law requires.",
    ],
    bullets: [
      "Passwords are handled by our sign in provider and are never visible to us.",
      "Data is encrypted in transit between your device and our providers.",
      "Your sign in session is stored on your device, and signing out removes it.",
      "Before any error report leaves your device, we mask tokens, passwords, one time codes and personal identifiers.",
      "Access to the data behind the app is limited to what is needed to run it.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    paragraphs: [
      "Under Kenya's Data Protection Act 2019 you have the following rights. In plain terms: it is your data, and you can ask us to show it, fix it or delete it.",
    ],
    bullets: [
      "Access: a copy of the personal data we hold about you.",
      "Correction: put right anything that is wrong or out of date.",
      "Deletion: close your account and remove the data in it.",
      "Portability: get a copy of your data in a usable form to move it elsewhere.",
      "Objection: object to a use based on our legitimate interests.",
      "Withdrawal of consent: withdraw at any time, for example for location, notifications or the waitlist.",
      `To do any of these, write to ${contact.email} from the email address on your account, or call ${contact.phone}. We will respond within 30 days and explain what we did in plain language.`,
      "If you are not happy with how we handled your data, you can complain to the Office of the Data Protection Commissioner of Kenya, the ODPC, at odpc.go.ke.",
    ],
  },
  {
    id: "children",
    heading: "Children",
    paragraphs: [
      "Travela is not meant for children. Under Kenya's Data Protection Act 2019 a child is anyone under 18, and we do not knowingly collect personal data from children.",
      "If you are under 18, please use Travela only with the help of a parent or guardian. If we learn that a child has given us personal data, we will delete it. A parent or guardian can ask us to do this at any time using the contact details below.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this policy as the app and the law change. When we do, we change the version and the date at the top of this page and keep a short history below. If a change is significant we will make it clear on the site or in the app.",
    ],
    bullets: [
      "Version 2.1, 13 November 2026: added a section on photos and copyright, confirming that Travela does not own the place photographs and that their owners reserve all rights.",
      "Version 2.0, 12 November 2026: this full policy replaced the earlier short summary, adding the sections on legal basis, retention, transfers and your rights.",
      "Version 1.0: the first privacy summary, published with the website.",
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    paragraphs: [
      `Questions about your data, or a request to see, fix or delete it, can go to ${contact.email} or by phone on ${contact.phone}.`,
      `We are Travela, based in ${contact.location}. If we cannot resolve your concern, you can raise it with the Office of the Data Protection Commissioner of Kenya at odpc.go.ke.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <LegalDocument
        eyebrow="Privacy"
        icon="shield"
        title="Privacy Policy"
        intro="How Travela handles your information, in plain language. This covers the Android app and this website."
        updated="13 November 2026"
        version="2.1"
        sections={SECTIONS}
      />
      <AppCta />
    </>
  );
}
