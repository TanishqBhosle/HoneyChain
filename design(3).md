# Honey Chain — UI/UX Design Specification

## 1. Design Goal

Honey Chain should feel like a **real rural technology product**, not a generic hackathon dashboard.

The product serves users with very different technical abilities:
- rural beekeepers
- collection operators
- inspectors
- processors
- distributors
- administrators
- consumers

The PRD requires mobile-first design, large touch targets, minimal text, icon-first interaction, low-bandwidth behavior and multilingual support. fileciteturn0file0L631-L679

---

# 2. Design Philosophy

## Product personality

```text
Trustworthy
Simple
Natural
Modern
Rural-friendly
Transparent
Data-driven
```

Avoid:
- overly futuristic blockchain visuals
- crypto-style UI
- excessive gradients
- complicated charts
- technical jargon
- crowded enterprise dashboards

---

# 3. Visual Direction

## Color concept

Suggested semantic palette:

```text
Honey / Amber
→ primary actions
→ honey identity

Deep Green
→ healthy
→ agriculture
→ sustainability

Red
→ critical alerts

Orange
→ warning

Neutral cream/white
→ background
```

Do not use color alone to communicate status. Pair color with:
- icon
- text
- label

Example:

```text
● Healthy
▲ Warning
! Critical
```

---

# 4. Typography

Use a highly readable sans-serif.

Recommended:

```text
Inter
Noto Sans
Noto Sans Devanagari
Noto Sans Kannada
```

Hierarchy:

```text
Page title: 28–32px
Section title: 20–24px
Card title: 16–18px
Body: 14–16px
Supporting text: 12–14px
```

For beekeeper mobile, prefer larger text.

---

# 5. Spacing

Use an 8px spacing system:

```text
4px
8px
16px
24px
32px
48px
64px
```

Keep screens visually calm.

---

# 6. Beekeeper Navigation

Mobile bottom navigation:

```text
┌─────────────────────────────────┐
│                                 │
│          Screen Content         │
│                                 │
├─────────────────────────────────┤
│ Home │ Hives │ Harvest │ Alerts │
└─────────────────────────────────┘
```

Maximum 4–5 primary destinations.

---

# 7. Beekeeper Home

## Goal

Answer these questions immediately:

1. Are my hives okay?
2. Which hive needs attention?
3. What should I do?
4. How much honey might I produce?

Layout:

```text
Good morning, Ramesh 👋

┌──────────────────────┐
│ 🐝 12 Active Hives   │
│ 10 Healthy           │
│ 1 Warning            │
│ 1 Critical           │
└──────────────────────┘

⚠ Attention needed
Hive H-07
Temperature is high

[ Check Hive ]

Production
12.4 kg estimated
```

---

# 8. Hive List

Each hive card:

```text
🐝 Hive H-07

Health
54 / 100
Warning

🌡 39°C
💧 74%
⚖ 42.1 kg
🐝 Activity 61%

[ View Hive ]
```

Do not show raw technical IDs as the primary label.

---

# 9. Hive Detail

Header:

```text
Hive H-07
Warning
```

Health ring:

```text
     54
   WARNING
```

Below:

```text
Temperature     39°C
Humidity        74%
Weight          42.1 kg
Activity        61%
```

Then:

```text
Why is this warning?

Temperature score     40
Humidity score        70
Activity score        60
Weight score          65
Disease risk          45
Environment           80
```

Then recommendation:

```text
Recommended action

Inspect hive ventilation
and environmental exposure.

[ Mark as Checked ]
```

---

# 10. Health Visualization

Use:
- circular score
- small trend chart
- status badge
- plain-language explanation

Avoid giant complex graphs.

A beekeeper should understand the screen in under 5 seconds.

---

# 11. Alerts

Screen:

```text
Alerts

🔴 Critical
Hive H-07
Abnormal temperature detected
39°C
[ Inspect ]

🟠 Warning
Hive H-04
Humidity is rising

🟢 Info
Hive H-02
Sensor connection restored
```

Filters:

```text
All | Critical | Warning | Resolved
```

---

# 12. Alert Detail

```text
⚠ Hive H-07

Temperature exceeded
recommended range.

Current
39°C

Recommended action
Inspect ventilation and
environmental exposure.

[ Mark as Checked ]
```

Never force users to interpret a graph before telling them what happened.

---

# 13. AI Analysis Flow

## Step 1

```text
Check Hive Health

Take a clear photo of the hive/bee.

[ 📷 Take Photo ]
[ Upload Photo ]
```

## Step 2

Loading:

```text
Analyzing image...

This may take a few seconds.
```

## Step 3

Result:

```text
Possible health indicator

Possible Varroa indicators

Confidence
78%

Recommendation

Inspect brood frames for
mite presence.

⚠ This is an AI screening aid,
not a confirmed diagnosis.
```

---

# 14. Harvest Flow

Wizard:

```text
1. Select Apiary
2. Select Hives
3. Harvest Date
4. Honey Type
5. Quantity
6. Review
7. Create Batch
```

Use progressive disclosure.

Do not show every field on one screen.

---

# 15. Batch Creation

Confirmation:

```text
Harvest recorded ✓

Batch ID
BATCH-2026-001

Honey
Multifloral

Quantity
14.2 kg

Source
2 hives
Coorg, Karnataka

[ View Batch Journey ]
```

---

# 16. Supply Chain Dashboard

Desktop layout:

```text
┌──────────────────────────────────────────────────┐
│ Honey Chain                         Profile      │
├────────────┬─────────────────────────────────────┤
│ Overview   │ Active Batches                      │
│ Batches    │                                     │
│ Quality    │ ┌──────┐ ┌──────┐ ┌──────┐        │
│ Processing │ │ 12   │ │ 4    │ │ 8    │        │
│ Packaging  │ │Total │ │Test  │ │Ready │        │
└────────────┴─────────────────────────────────────┘
```

---

# 17. Batch Timeline

Use a vertical timeline:

```text
✓ Harvested
  25 Aug 2026
  Ramesh K.

      │

✓ Collected
  26 Aug 2026
  Coorg Collection Center

      │

✓ Quality Tested
  27 Aug 2026
  Moisture: 18.2%

      │

✓ Processed
  28 Aug 2026

      │

● Packaged
  Current
```

Each event should have:
- status
- actor
- timestamp
- location if relevant
- verification indicator

---

# 18. Quality Inspector Screen

Prioritize speed.

```text
Pending Quality Tests

BATCH-2026-001
Multifloral
14.2 kg

[ Test ]

BATCH-2026-002
Forest Honey
10.5 kg
```

Test form:

```text
Moisture %
[ 18.2 ]

Purity Notes
[................]

Result
○ Approve
○ Reject

[ Submit Result ]
```

---

# 19. Processor Screen

```text
Approved for Processing

BATCH-2026-001
✓ Quality approved

[ Start Processing ]
```

After processing:

```text
Processing completed ✓

[ Package Batch ]
```

---

# 20. QR Packaging Screen

```text
Package Honey

Batch
BATCH-2026-001

Package size
500 g

Package serial
PKG-2026-00001

[ Generate QR ]
```

Then show:

```text
QR Generated ✓

┌──────────────┐
│              │
│     QR       │
│              │
└──────────────┘

PKG-2026-00001

[ Download/Print ]
```

For the actual MVP, QR can be displayed/printed from the browser.

---

# 21. Consumer Verification — Most Important Screen

This is the visual centerpiece.

Top:

```text
✓
VERIFIED AUTHENTIC HONEY
```

Then:

```text
Multifloral Honey

From Coorg, Karnataka
Harvested 12 August 2026
```

Then:

```text
Secure journey verified
```

---

# 22. Consumer Timeline

```text
🐝
Harvested
12 Aug 2026

│

🧪
Quality Tested
Moisture 18.2%
Approved

│

🏭
Processed
14 Aug 2026

│

📦
Packaged
15 Aug 2026

│

🚚
Distributed
16 Aug 2026
```

Make the timeline scroll smoothly.

---

# 23. Consumer Source Card

```text
Your honey's source

🐝 Beekeeper
Ramesh K.

📍 Region
Coorg, Karnataka

🌼 Honey Type
Multifloral

📅 Harvest
12 August 2026
```

Do not show private contact information.

---

# 24. Blockchain Proof Card

Do not lead with blockchain.

Instead:

```text
🔐 Secure Verification

This product's supply-chain
records have been securely
verified.

Blockchain proof confirmed ✓

[ View verification details ]
```

Expandable details can show:
- transaction hash
- network
- block number

---

# 25. Invalid QR Experience

```text
⚠ PRODUCT COULD NOT BE VERIFIED

We could not verify this package.

Possible reasons:
• QR code is invalid
• Package record is missing
• QR may have been copied

Please verify with the retailer.
```

Never show a fake "maybe authentic" green result.

---

# 26. QR Clone Warning

If scan anomaly detected:

```text
⚠ Verification caution

This package has been scanned
an unusually high number of times.

Please verify the package with
the retailer before purchasing.
```

---

# 27. Admin Dashboard

KPIs:

```text
1,248
Registered Beekeepers

8,420
Active Hives

4,821
Honey Batches

17,392
QR Verifications
```

Charts:
- hive health distribution
- batches by lifecycle stage
- regional beekeeper map/list
- disease alert trend
- verification scans

---

# 28. Responsive Design

## Mobile

Primary for:
- beekeeper
- consumer

Use:
- bottom navigation
- cards
- single-column layouts
- large actions

## Tablet

Two-column where useful.

## Desktop

Supply-chain/admin:
- sidebar
- tables
- charts
- detail panels

---

# 29. Low-Bandwidth Mode

When enabled:

- load images only when requested
- reduce animations
- use skeletons
- prioritize text
- cache recent data
- compress uploads
- avoid autoplay video
- use small icons

---

# 30. Offline UI

When offline show:

```text
● Offline

Your changes are saved on this device
and will sync when you reconnect.
```

When syncing:

```text
↻ Syncing 3 changes...
```

After success:

```text
✓ All changes synced
```

---

# 31. Loading States

Do not show blank screens.

Examples:

```text
Loading hives...
Loading batch journey...
Analyzing image...
Verifying package...
Submitting quality result...
```

---

# 32. Error States

Errors must be actionable.

Bad:

```text
Something went wrong.
```

Good:

```text
Could not connect to the server.

Your harvest is saved locally.
We will sync it when you reconnect.
```

---

# 33. Accessibility

Must support:
- keyboard navigation on desktop
- screen-reader labels
- visible focus
- sufficient contrast
- semantic HTML
- alt text
- large tap targets
- status icons + text
- reduced motion preference

---

# 34. Multilingual Design

MVP languages:

```text
English
Hindi
Kannada
```

Do not hard-code user-facing strings.

Use translation keys:

```text
hive.health
hive.warning
batch.created
verification.verified
```

Example:

```text
"verification.verified": {
  "en": "Verified Authentic Honey",
  "hi": "...",
  "kn": "..."
}
```

---

# 35. Microinteractions

Use subtle animations for:
- health score update
- alert arrival
- batch event completion
- QR generated
- verification success

Do not animate everything.

---

# 36. Demo Mode

Create a hidden/demo-friendly control for the hackathon:

```text
Demo Controls

Hive:
[ Normal ] [ Warning ] [ Critical ]

Batch:
[ Advance Status ]

Blockchain:
[ Simulate Confirmed ]
```

This should only exist in development/demo environments.

It allows the team to demonstrate the full system without depending on unpredictable hardware or network behavior.

---

# 37. Design Success Criteria

A user should be able to answer:

### Beekeeper

> Which hive needs attention?

within 3 seconds.

### Supply-chain operator

> What happened to this batch?

within 5 seconds.

### Consumer

> Is this honey verified and where did it come from?

within 5 seconds.

### Judge

> What makes this different?

within 30 seconds.

The core answer:

```text
IoT + AI protects the hive.
Blockchain protects the record.
QR makes the proof accessible.
```
