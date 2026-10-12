# Publish at driyadclinic.com (GoDaddy)

Code changes and domain configuration are separate. GitHub changes sync into the
active Lovable branch; use Publish / Update to deploy the reviewed version.

## Connect the domain

1. Open the clinic project in Lovable and publish/update the site.
2. Open **Project → Settings → Domains → Connect existing domain**.
3. Enter `driyadclinic.com`, choose **Root domain**, and keep the option to connect
   `www.driyadclinic.com` enabled.
4. Choose automatic GoDaddy setup, or manual setup. Lovable provides the exact
   records and verification value. Complete setup for both hostnames if prompted.
5. For manual setup: sign in to GoDaddy → Domain Portfolio → `driyadclinic.com`
   → DNS → DNS Records. Add/edit only the website records Lovable specifies.
   The root A record normally uses name `@`; copy its value from Lovable.
   Add the TXT record using the complete name and value shown in Lovable.
   Configure `www` using its own setup instructions; do not assume the root
   verification record verifies both hostnames.
6. Leave existing email MX, SPF, DKIM, and DMARC records intact. Resolve conflicting
   A/AAAA/CNAME or forwarding settings only for the website hostname being connected.
   If the domain uses another provider's nameservers, edit DNS there instead.
7. Return to Lovable, finish verification, and wait for **Live** and HTTPS issuance.
   Most DNS changes finish in hours; allow up to 72 hours.
8. Select the desired primary domain after both addresses are Live. Lovable redirects
   other connected hostnames to it.

Custom domains require a paid Lovable plan. DNS configuration needs no AI prompt;
running out of chat credits is separate from code development and hosting access.
Check your account for any publishing or plan restrictions before buying more services.

## Verify after publishing

- Visit both `https://driyadclinic.com` and `https://www.driyadclinic.com`.
- Open `/book` directly, refresh, select a time, return home, and reopen bookings.
- Switch language on the booking page; confirm it stays selected after returning home.
- Check the address search link, images, and videos on a phone.
- Confirm Cal.com's availability timezone matches the clinic schedule.
- Create one clearly identified test booking yourself and verify confirmation,
  cancellation, and rescheduling. Do not include real patient medical information.

## References

- https://docs.lovable.dev/features/custom-domain
- https://docs.lovable.dev/features/publish
- https://docs.lovable.dev/integrations/github
- https://www.godaddy.com/help/add-an-a-record-19238
- https://www.godaddy.com/help/add-a-txt-record-19232
