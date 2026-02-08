# NurseBnB.com – Product Requirements Document (PRD)

## 1. Product Overview

**Product Name:** Nurse BnB
**Domain:** nurse-bnb.com
**Product Type:** Niche housing website for traveling healthcare professionals
**Primary Goal:** Generate qualified booking inquiries and direct reservations for three tiered, medium-term rental units (30–180 days).

This is **not** a generic Airbnb clone. The site exists to:

* Clearly communicate a professional, quiet, nurse-focused housing experience
* Segment guests into the correct unit tier before contact
* Enable fast, low-friction inquiry and booking
* Reduce owner operational overhead

Success = predictable occupancy with minimal guest management.

---

## 2. Target Users

### Primary User

* Traveling nurses
* Allied health professionals (imaging techs, locum providers)
* Age 24–55
* On 8–26 week contracts

### User Priorities

1. Monthly price clarity
2. Quiet / safety
3. Privacy level transparency
4. Reliable Wi-Fi
5. Simple booking

---

## 3. Core Product Philosophy

* **Clarity over cleverness**
* **Predictability over flexibility**
* **Professional housing, not hospitality fluff**

The site should feel calm, minimal, and trustworthy.

---

## 4. Unit Model (Business Logic)

### Unit 1: Studio Suite (Premium)

* Fully private studio apartment
* Private entrance + patio
* Full kitchen + full bathroom
* Highest privacy
* Highest price

### Unit 2: Garden Suite (Economy)

* Private bedroom + private bathroom
* Shared kitchen + laundry (shared with Upper Retreat only)
* Ground floor
* Mid-tier price

### Unit 3: Upper Retreat (Spacious Premium)

* Entire upper level
* Master bedroom + second bathroom
* Full kitchen, dining room, living room, den
* Deck with water view
* Shared laundry only
* Price slightly below or equal to Studio Suite

---

## 5. Functional Requirements

### 5.1 Public Website

#### Pages

* Home (single-page by default)
* Optional: Availability / Apply
* Optional: FAQ
* Optional: Contact

#### Home Page Sections

1. Hero (value proposition + CTA)
2. Who It’s For / Who It’s Not
3. Unit Comparison (3 tiers)
4. Location & commute highlights
5. Pricing philosophy (monthly, flat-rate)
6. How booking works
7. Availability CTA

---

### 5.2 Inquiry & Booking Flow

**Phase 1 (MVP – Required)**

* Availability request form
* Unit selection
* Contract length selector (8 / 13 / 26 weeks)
* Start date
* Occupant details
* Employer / contract hospital (optional but recommended)
* Stripe payment link sent manually

**Phase 2 (Post-MVP)**

* Real-time availability calendar
* Direct Stripe checkout
* Automated confirmation email
* Lease e-sign (DocuSign / HelloSign)

---

### 5.3 Payments

**Stripe Integration**

* Monthly rent payments
* Security deposit (optional)
* One-time cleaning fee (optional)
* Invoices + receipts

**No nightly pricing.** Monthly only.

---

## 6. Technical Requirements

### Frontend

* Next.js (latest stable, App Router)
* TypeScript
* Tailwind CSS
* Server Components by default
* Minimal client-side JS

### Backend

* Next.js Route Handlers
* Server Actions
* Optional lightweight DB (Postgres or Supabase) for:

  * Inquiries
  * Availability

### Payments

* Stripe API (latest)
* Webhooks for payment confirmation

### Hosting

* Vercel (preferred)
* Environment-based config

---

## 7. Non-Functional Requirements

### Performance

* Lighthouse score > 90
* Sub-1s page load

### Accessibility

* WCAG AA baseline
* High-contrast text
* Keyboard navigable

### SEO

* Nurse-specific keywords
* Location-based schema
* Clean metadata

---

## 8. Design System

### Visual Style

* Calm, professional
* Neutral palette (warm whites, muted blues/greens)
* No loud accent colors

### Typography

* Sans-serif (Inter or similar)
* Large readable body text

### Tone

* Professional
* Clear
* Reassuring
* No sales hype

---

## 9. Analytics & Tracking

**Required**

* Page views
* CTA clicks
* Inquiry submissions

**Optional**

* Google Analytics or Plausible
* Conversion tracking

---

## 10. Legal & Compliance

* Minimum stay disclosure
* House rules clearly visible
* No instant booking without approval
* Privacy policy

---

## 11. MVP Success Criteria

* Site live within 1–2 weeks
* Inquiry form working
* Stripe payments functional
* Clear unit differentiation
* At least one booked contract via direct site

---

## 12. Future Enhancements (Out of Scope for MVP)

* Multi-property support
* Nurse verification system
* Saved guest profiles
* Automated lease generation
* Admin dashboard

---

## 13. Handoff Notes for Coding Agent

* Optimize for simplicity
* Do not overbuild
* Ship fast, iterate later
* Assume single-property MVP
* Favor server-side rendering

This product should feel **boringly reliable**.

---

**End of PRD**
