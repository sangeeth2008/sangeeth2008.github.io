# PORTFOLIO ACTION ITEMS & CONTENT PLACEHOLDERS (TODO.md)

This document tracks all content placeholders and assets that need to be provided by Sangeeth Sasikumar K S. In accordance with strict engineering integrity standards, **zero** fake metrics, awards, internships, or testimonials have been invented.

---

## 1. Credentials & Certifications

- [x] **Official PDF Resume**:
  - Current status: Fully integrated and verified. Authentic CV file `Sangeeth_Sasikumar_CV.pdf` provided and synced to `assets/Sangeeth_Sasikumar_CV.pdf` and `assets/Sangeeth_Sasikumar_Resume.pdf`.
  - Active triggers: Direct download triggers configured across Navbar, Mobile Drawer, Hero CTAs, About bio, Contact links list, Footer Elsewhere list, Command Palette (`Ctrl+K` -> CV), and Terminal CLI (`resume` and `cv` commands).

- [ ] **Certifications Section** (`ADD CERTIFICATE HERE`):
  - Current status: Marked with clear placeholders in the capabilities/journey sections.
  - Action: Supply actual course credentials (e.g., Coursera, NPTEL, Edge Impulse, AWS, or college workshops) with issuer, date, and verification URL if available.

- [ ] **Internships Section** (`ADD INTERNSHIP HERE`):
  - Current status: No fabricated companies or roles have been added.
  - Action: When internships or research fellowships are completed, provide company name, role, dates, and key engineering deliverables.

- [ ] **Achievements / Awards** (`ADD ACHIEVEMENT HERE`):
  - Current status: No fake competition victories or prizes added.
  - Action: Provide verified hackathon placements, robotics symposium awards, or academic recognitions.

---

## 2. Media & Hardware Assets

- [ ] **Showreel Video**:
  - Current asset: `assets/Robotic_rover_interface_animation_20260926221438.mp4` (42-second rover demo).
  - Status: Modal interface updated to display clean semantic title ("Autonomous Differential Rover V2 — Lab Demo") instead of raw filename.

- [ ] **Hardware Bench Photos**:
  - Current assets: `assets/sangeeth.jpg` and 7 generated high-fidelity project images in `assets/img/work/`.
  - Action: As hardware builds progress, optional high-resolution photos of actual soldered PCBs, chassis wiring, or oscilloscope captures can be added to replace any conceptual renders.

---

## 3. Contact & Socials (Verified)

- [x] **Email Address**: `sangeethcherur@gmail.com` (verified across all files).
- [x] **GitHub**: `https://github.com/sangeeth2008` (active).
- [x] **LinkedIn**: `https://www.linkedin.com/in/sangeeth-sasikumar-k-s-1b4703422/` (active).
- [x] **Institution**: Jyothi Engineering College, Kerala, India.

---

## 4. Google Form → Google Sheets Connection Guide

To link your animated website contact form directly into a live Google Spreadsheet:

1. **Create the Google Form**:
   - Go to [Google Forms](https://forms.google.com) and create a **New blank form** (title it `Website Contact Telemetry`).
   - Add 4 questions (make them Short answer or Paragraph):
     - Question 1: `Name` (Short answer, Required)
     - Question 2: `Email` (Short answer, Required)
     - Question 3: `Topic` (Short answer)
     - Question 4: `Message` (Paragraph, Required)

2. **Connect to Google Sheets**:
   - Click the **Responses** tab at the top of the form.
   - Click the green **Link to Sheets** icon.
   - Select **Create a new spreadsheet** (e.g. `Portfolio Contact Responses`) and click **Create**.
   - *Every submission will now instantly appear as a row in this Google Sheet!*

3. **Get Field Entry IDs (`entry.XXXXXXXXX`)**:
   - Click the three vertical dots (`⋮`) in the top right corner of the form.
   - Select **Get pre-filled link**.
   - Type `NAME`, `EMAIL`, `TOPIC`, `MESSAGE` into the 4 fields.
   - Click **Get link** at the bottom, then click **Copy link**.
   - Paste that copied link into Notepad. It will look like:
     `https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?usp=pp_url&entry.1000001=NAME&entry.1000002=EMAIL&entry.1000003=TOPIC&entry.1000004=MESSAGE`
   - Notice the numbers after `entry.`:
     - Your Name field ID: `entry.1000001`
     - Your Email field ID: `entry.1000002`
     - Your Topic field ID: `entry.1000003`
     - Your Message field ID: `entry.1000004`

4. **Get the Form Response URL**:
   - In that same URL, change `/viewform?...` to `/formResponse`.
   - Your action URL is: `https://docs.google.com/forms/d/e/1FAIpQLSc.../formResponse`

5. **Connected Google Form & Live Confirmation HUD**:
   - Google Form Action: `https://docs.google.com/forms/u/0/d/e/1FAIpQLSdIL-4f1TfPI6v_s4t2AEagtONAUn-pW-pTHymNuH-owRK2Uw/formResponse`
   - Entry IDs mapped:
     - Name: `entry.2005620554`
     - Email: `entry.1045781291`
     - Phone: `entry.1166974658`
     - Address / Institution: `entry.1065046570`
     - Scope & Message: `entry.839337160`
   - Hidden background iframe (`googleFormIframe`) prevents page reloads or redirects.
   - On submission, dynamically populates a high-tech confirmation receipt card (`#transmissionSuccess`) with sender name, return email, project scope, timestamp in IST, unique dispatch reference ID (`TX-...`), audio cue (`boot` SFX), and smooth scroll focus.


