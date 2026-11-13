import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/LegalDocument";
import { AppCta } from "@/components/ui";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using the Travela app and this website, covering your account, the licence to use the app, travel information and liability.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    paragraphs: [
      "Travela is a free travel app for Kenya. It covers all 47 counties and 209 places, and it keeps working when you lose signal.",
      `These terms are between you and Travela, based in ${contact.location}. You can reach us at ${contact.email} or on ${contact.phone}.`,
    ],
  },
  {
    id: "the-agreement",
    heading: "The agreement",
    paragraphs: [
      "By downloading the app, creating an account or using this website, you agree to these terms. If you do not agree with them, please do not use the app or the site.",
      "These terms sit alongside our privacy policy, which explains how your data is handled. You can read it at travelaapp.co.ke/privacy. Where the two touch on the same thing, this page is about using the app and the privacy policy is about your data.",
    ],
  },
  {
    id: "eligibility",
    heading: "Eligibility",
    paragraphs: [
      "You must be old enough to agree to these terms on your own. Travela is intended for people aged 18 and over. If you are under 18, please use Travela only with a parent or guardian.",
      "You need one account per email address, and the email address you use must be one you are allowed to use.",
    ],
  },
  {
    id: "your-account",
    heading: "Your account",
    paragraphs: [
      "You sign in with an email address or with Google. One account is allowed per email address.",
      "Keep your details accurate and up to date, and keep your password to yourself. Tell us straight away at our email address if you think someone else has got into your account.",
      "Anything that happens under your sign in is treated as yours. In plain terms: your account is your responsibility, so keep it safe and tell us fast if something looks wrong.",
    ],
  },
  {
    id: "licence-to-use",
    heading: "Your licence to use Travela",
    paragraphs: [
      "We give you a personal, non-transferable and non-exclusive licence to use the app and the website for your own travel. It is for you, and you cannot give it to anyone else or use it commercially without our written permission.",
      "This licence stays in place until you stop using Travela or your account is closed.",
      "In plain terms: the app is for your own trips, not for you to resell or pass off as your own product.",
    ],
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    paragraphs: [
      "Please use Travela fairly. If you break these rules we may suspend or close your account.",
      "In particular, you must not:",
    ],
    bullets: [
      "reverse engineer, decompile or try to extract the source code of the app;",
      "scrape, copy or bulk download the content, or resell it;",
      "circumvent, disable or interfere with the app's security, or with anyone else's use of it;",
      "upload anything unlawful, or anything that belongs to someone else without their permission;",
      "use the app or the site to send spam, or to attack or overload our systems.",
    ],
  },
  {
    id: "content-and-ip",
    heading: "Content and intellectual property",
    paragraphs: [
      "The app and the website, and the content in them such as county pages, place notes, text, images and the Travela name and logo, belong to Travela or the people who license it to us. You may not use them except as these terms allow.",
      "When you upload photos or notes, they remain yours. You give us a licence to store, copy and show them back to you, and to make the technical copies needed to run the service, such as a backup. We do not sell them and we do not use them for advertising.",
      "If you upload a photo, you confirm that you have the right to share it and that it does not break anyone else's rights.",
      "Travela does not own the photographs of the places shown in the app and on this website. They are used only to illustrate the destinations, and the copyright in each photograph stays with the photographer or other rights holder who created it. All rights in those photographs are reserved by their owners.",
      "We claim no ownership of these pictures, and we do not sell or license them. If you are a photographer or rights holder and you believe a picture has been used without permission, or with the wrong credit, write to us and we will credit it properly or take it down promptly.",
    ],
  },
  {
    id: "waitlist",
    heading: "The waitlist",
    paragraphs: [
      "The website offers a waitlist. If you join, you give us your email address and optionally your name and a county you are interested in, so we can send you one launch email.",
      "Joining the waitlist does not create an account and does not commit you to anything. You can ask to be removed at any time.",
    ],
  },
  {
    id: "third-party-services",
    heading: "Third party services",
    paragraphs: [
      "Travela relies on other companies to work. These include Supabase for accounts and data, Google for sign in and for Google Play app distribution, Brevo for email, Vercel for website hosting and Cloudflare for spam protection on the forms.",
      "Links to a partner, guide or event page take you off Travela. Once you follow one, you are dealing with that provider directly and on their terms, not ours.",
      "In plain terms: the app is ours, but it stands on services run by other companies, and their own terms apply when you use them.",
    ],
  },
  {
    id: "travel-disclaimer",
    heading: "Travel information and safety",
    paragraphs: [
      "We put the places, counties and events together in good faith, but travel details change. Fees, opening hours, road conditions, weather, wildlife and access can all move without notice.",
      "The app is a guide, not a promise. Check the operator's or organiser's own page or a local source before you travel, and treat that as the final word.",
      "Your safety is your responsibility. Terrain, wildlife, water and roads carry real risk. Travel within your limits, follow local rules and guidance, and make your own decisions about where it is safe to go.",
    ],
  },
  {
    id: "availability-and-changes",
    heading: "Availability and changes to the app",
    paragraphs: [
      "Most of the app's content lives on your phone and works without a signal. The online parts, such as signing in and syncing your progress, need a connection.",
      "We work to keep everything running, but we cannot promise that the app or the site will always be available or free of faults. We may add, change or retire features as the app grows.",
    ],
  },
  {
    id: "fees",
    heading: "Fees",
    paragraphs: [
      "Travela is free to download and free to use. There are no adverts and no in-app purchases.",
      "Data costs from your mobile network are yours. Anything you buy from a travel partner, guide or event organiser is a matter between you and them.",
    ],
  },
  {
    id: "disclaimers-and-liability",
    heading: "Disclaimers and liability",
    paragraphs: [
      "To the extent the law allows, Travela provides the app and the site as they are, without warranties of any kind. We do not promise that the content is complete, accurate or suitable for a particular trip.",
      "To the extent permitted by Kenyan law, Travela is not liable for indirect or consequential losses, or for losses that come from your travel decisions, from third party services, or from content that you or others add.",
      "Nothing in these terms limits any right you have that cannot be limited by law, including under Kenya's consumer protection law.",
      "In plain terms: we do our best, but you travel at your own risk and we cannot be responsible for everything that happens on the road.",
    ],
  },
  {
    id: "indemnity",
    heading: "Indemnity",
    paragraphs: [
      "If a claim is made against Travela because of how you used the app, because of content you uploaded, or because you broke these terms, you agree to cover the reasonable costs of dealing with that claim.",
      "In plain terms: if you cause a problem through your own use, you, not us, are responsible for it.",
    ],
  },
  {
    id: "termination",
    heading: "Suspension and ending your account",
    paragraphs: [
      "You can stop using Travela at any time. In the app you can sign out and reset your progress on the device from the settings screen, and you can ask us to close your account and delete your data at any time.",
      "We may suspend or close your account if you break these terms, if the law requires it, or if we need to protect the app or other users.",
      "When your account is closed, we delete the data described in our privacy policy, except for any copy still in backup and anything we must keep by law.",
    ],
  },
  {
    id: "governing-law",
    heading: "Governing law and disputes",
    paragraphs: [
      "These terms are governed by the laws of Kenya.",
      `If a dispute comes up, please write to ${contact.email} first and set out the problem. We will try to sort it out with you directly within 30 days.`,
      "If we cannot resolve it that way, the dispute will be decided by the courts of Kenya, and the Kenyan courts will have jurisdiction.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    paragraphs: [
      "We may update these terms as the app changes. When we do, we change the version and the date at the top of this page and keep a short history below.",
      "Continuing to use Travela after a change means you accept the new terms. If you do not agree with them, please stop using the app.",
    ],
    bullets: [
      "Version 2.1, 13 November 2026: added a copyright disclaimer confirming that Travela does not own the place photographs and that their owners reserve all rights.",
      "Version 2.0, 12 November 2026: this full set of terms replaced the earlier short summary, covering the licence, acceptable use, liability and governing law in full.",
      "Version 1.0: the first terms summary, published with the website.",
    ],
  },
  {
    id: "general",
    heading: "General",
    paragraphs: [
      "If any part of these terms is found to be unenforceable, the rest of them still stands.",
      "These terms, together with our privacy policy, are the whole agreement between you and Travela about using the app and the site.",
      "We may transfer our rights and duties under these terms to another organisation, but this will not affect your rights under them.",
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    paragraphs: [
      `Questions about these terms can go to ${contact.email} or by phone on ${contact.phone}.`,
      "If you are not happy with how we handled a data matter, you can also contact the Office of the Data Protection Commissioner of Kenya at odpc.go.ke. Our privacy policy explains this in more detail.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <LegalDocument
        eyebrow="Terms"
        icon="book"
        title="Terms of Service"
        intro="The rules for using the Travela app and this website, written in plain language."
        updated="13 November 2026"
        version="2.1"
        sections={SECTIONS}
      />
      <AppCta />
    </>
  );
}
