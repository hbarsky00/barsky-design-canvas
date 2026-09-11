import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredFarmFlowCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="farmflow"
    title="FarmFlow"
    description="An organisation with its own farm was taking plant requests by email and phone. This is the system that replaced the inbox, and it is still being built."
    tags={["Internal Tools", "Operations", "AI-Assisted Product", "Solo Build"]}
    meta={[
      { label: "Role", value: "Designer & Developer" },
      { label: "Status", value: "Clickable build, backend next" },
    ]}
    liveUrl="https://farmflow-app.netlify.app"
    heroImage={{
      src: "/images/farmflow/01-requester-home.webp",
      alt: "FarmFlow requester home — what's available this week, five ways to start a request, and the department's pending, approved and upcoming counts",
      hoverVideo: "/farmflow-walkthrough.mp4",
      caption:
        "Where a department lands after signing in. Play it and the walkthrough follows a request from Sarah in Events through to James on the farm team: new request, the queue, the ticket, the calendar, the catalogue, reports and the availability rules. Recorded off the live build with Playwright, so this is the app as it is today. Names and figures are the demo dataset.",
      width: 1600,
      height: 1000,
    }}
    blocks={[
      {
        heading: "A Farm That Ran on Email",
        paragraphs: [
          "An organisation with its own farm and landscaping team was taking requests from every other department by email and phone. Flowers for an event, herbs for the kitchen, a replacement for a dead shrub by the east entrance. Each one arrived in whatever form the sender felt like, and the farm team worked out the rest.",
          "The line from the stakeholder that framed the whole thing was that the systemisation would be \"great for efficiency and clarifying mutual expectations.\" Mutual is the word that matters. The farm did not know what departments were going to ask for, and departments did not know what the farm could grow or how long it took. Nobody was being difficult. There was just no shared place for either side to see the other.",
          "So the job was a request system where both sides can see the same thing: what is available this week, what has been asked for, where it is in the process, and when it will arrive.",
        ],
      },
      {
        heading: "Twelve Screens Before a Line of Code",
        paragraphs: [
          "I started in July with twelve screens and a requirements document, and I wrote the document so that a coding agent could build from it one page at a time. Every page got its own build prompt: what it does, who can see it, every state it can be in, and what it must match pixel for pixel.",
          "That sounds like process for its own sake. It was the opposite. Writing a prompt per page forced me to decide things a Figma file lets you leave vague, like what an admin sees when there are no requests yet, or what happens when a requester opens a ticket that has moved to a status they cannot act on.",
          "The four screens here are from that July build. They are the version the stakeholder reacted to, which is the point of building a clickable one first.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/farmflow/july-02-requester-home.webp",
            alt: "July prototype of the requester home — a top navigation bar with Home, New Request, My Requests, Locations and Admin, above the weekly availability banner and four request cards",
            caption:
              "Requester home, July. Four ways in and a top bar with five items. Compare it with the version at the top of this page.",
            width: 1400,
            height: 875,
          },
          {
            src: "/images/farmflow/july-03-new-request.webp",
            alt: "July prototype of the new request form — category tiles for flowers, herbs, vegetables, service and special, and the request details form",
            caption: "New request, July. Five categories. There was no Fruits tab yet, and no department code or budget line on the form.",
            width: 1400,
            height: 875,
          },
          {
            src: "/images/farmflow/july-07-admin-dashboard.webp",
            alt: "July prototype of the farm admin dashboard — request counts, urgent items and a queue",
            caption: "Admin dashboard, July. One admin role, with every privilege.",
            width: 1400,
            height: 875,
          },
          {
            src: "/images/farmflow/july-10-admin-calendar.webp",
            alt: "July prototype of the admin calendar — a month view of deliveries",
            caption: "Admin calendar, July. Deliveries only. Reservations did not exist as an idea yet.",
            width: 1400,
            height: 875,
          },
        ],
      },
      {
        heading: "What the Feedback Added",
        paragraphs: [
          "The stakeholder came back with a list, and almost none of it was cosmetic. Fruits needed its own category. Honey and eggs were coming, so those had to be designed for even if they shipped behind a flag. Every request needed a department code and a budget line so it could be charged back. Email had to be a first-class way to be contacted, with phone as the backup rather than the other way round.",
          "Two of the items were whole modules. Landscaping needed its own request type and its own admin, because a dead hedge is not a flower order. And departments wanted to reserve the farm itself, for tours, team events and harvest days, which meant the farm team needed a way to say which days and slots were open.",
          "One item split a role in two. The farm lead wanted extra admins who could work the queue and manage the calendar day to day, but could not change when the farm was open. That became an Operations Admin, and it is the reason permissions in this app are individual privileges rather than role labels. Twelve screens became twenty-two.",
        ],
        images: [
          {
            src: "/images/farmflow/july-vs-now-home.webp",
            alt: "Side by side: the July requester home with a five-item top bar, and the current version with a sidebar that adds Landscaping and Reserve Farm, plus a fifth card for reserving the farm",
            caption:
              "July on the left, now on the right. The sidebar gained Landscaping and Reserve Farm, the cards gained a fifth, and the weekly availability banner stayed exactly where it was because nobody argued with it.",
            width: 1600,
            height: 500,
          },
        ],
      },
      {
        heading: "Four Roles, and Who Can Touch Availability",
        paragraphs: [
          "A requester sees their own department's requests and nothing else. The farm admin sees everything. The operations admin sees everything the farm admin does, and the one control they do not have is the farm's opening hours and reservation slots. The landscaping admin sees the landscaping catalogue and queue, and none of the farm's.",
          "The interesting one is that missing control. It would have been easier to make Operations Admin a copy of Farm Admin with one checkbox unticked. Instead every admin capability is a named privilege, and a role is just a default set of them. That way the farm lead can grant or revoke one thing without inventing a new role, and when honey and eggs arrive and somebody needs a kitchen role, it is a row of toggles rather than a schema change.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/farmflow/10-admin-dashboard.webp",
            alt: "Farm admin dashboard — new submissions, needs-info, next-7-days and photo-request counts, urgent items flagged, and pickup requests pending coordination",
            caption: "The farm lead's first screen. Urgent items and anything waiting on a photo sit above everything else, because those are the two things that stall a delivery.",
            width: 1600,
            height: 1000,
          },
          {
            src: "/images/farmflow/16-availability-manager.webp",
            alt: "Availability manager — a weekly schedule of open days, time slots and staffed windows, with a note that only the main admin can edit it",
            caption: "The one screen an operations admin can see but not change. Which days the farm is open, which slots can be booked, and whether a team member will be there.",
            width: 1600,
            height: 1000,
          },
          {
            src: "/images/farmflow/17-user-management.webp",
            alt: "User management — staff listed with role, department and preferred contact method, and a departments table with codes and budget line items",
            caption: "Roles, departments, and the budget line each department charges to. The privilege toggles live behind each user row.",
            width: 1600,
            height: 1000,
          },
          {
            src: "/images/farmflow/19-landscaping-admin.webp",
            alt: "Landscaping admin — a triage queue of landscaping requests with approve, needs-info and view actions, and the landscaping catalogue counts",
            caption: "The landscaping admin's whole world. Their catalogue, their queue, and no way into the farm's.",
            width: 1600,
            height: 1000,
          },
        ],
      },
      {
        heading: "The Request Is the Whole Product",
        paragraphs: [
          "Everything else exists to move a request from pending to delivered. A requester picks a category, then items from the catalogue with quantities and lead times already on them, then a location from their department's own list, a need-by date, how flexible that date is, and whether they want a photo before it leaves the farm.",
          "That last one came from the farm side. Flowers for an event are the request most likely to disappoint, and the cheapest moment to find out is before the van leaves. So a request can ask for a photo, the farm team attaches one, and the requester confirms it from wherever they are. Every transition from pending through approved, in progress, photo confirmed and fulfilled is logged and shows up on the ticket as a timeline.",
          "Needs Info is a status rather than an email. When the farm team has a question, it goes on the request, the requester answers on the request, and the answer is still there when someone looks at the ticket in three weeks.",
        ],
        videos: [
          {
            src: "/farmflow-walkthrough.mp4",
            poster: "/images/farmflow/walkthrough-poster.jpg",
            caption:
              "A minute through the live build. Sarah from Events signs in, opens a new request, checks her queue and a ticket, looks at reserving the farm. Then James on the farm team: the request queue, the ticket from his side, the calendar, the catalogue, reports, and the availability rules only he can change. Recorded with Playwright against farmflow-app.netlify.app.",
            width: 1440,
            height: 900,
          },
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/farmflow/02-new-request.webp",
            alt: "New request — category tiles for flowers, herbs, vegetables, fruits, service and special, the details form with department code and budget line, and an order summary panel",
            caption: "Fruits is the sixth tile, and the department code and budget line are filled from the department but editable per request. Both came from the feedback round.",
            width: 1600,
            height: 1000,
          },
          {
            src: "/images/farmflow/04-request-details.webp",
            alt: "Request details for FR-2026-0012 — a timeline from submitted through reviewed to approved and scheduled, quick actions, delivery details and the farm contact",
            caption: "The requester's view of a ticket. The timeline is the request_events log rendered as a story, and the farm contact is a real person with a preferred way to be reached.",
            width: 1600,
            height: 1000,
          },
          {
            src: "/images/farmflow/12-request-ticket.webp",
            alt: "Admin request ticket — universal request details, the department, location, need-by date, delivery method and budget line, and quick actions to approve, request info, schedule, upload a photo or fulfil",
            caption: "The same request from the farm side. Approve, ask for more information, schedule, attach the confirmation photo, mark it fulfilled, or reject it, all from one column.",
            width: 1600,
            height: 1000,
          },
          {
            src: "/images/farmflow/13-admin-calendar.webp",
            alt: "Admin calendar — a week of deliveries and reservations colour-coded by type, with today's schedule listed alongside",
            caption: "Deliveries and farm reservations on one calendar, in their own colours, because they compete for the same team on the same day.",
            width: 1600,
            height: 1000,
          },
        ],
      },
      {
        heading: "Landscaping Is Simpler on Purpose",
        paragraphs: [
          "The brief for landscaping was a sentence: the farm has more options. A landscaping request is a new planting, a replacement, plants for an event, or maintenance, and the replacement flow is where the design work went.",
          "When a plant dies, the person reporting it usually does not know what it was. So choosing the plant is optional. You can upload a photo of the damage, give a location or drop a pin on the property map, and describe it in your own words, and the landscaping team will go and look. The stakeholder's exact words were that landscaping can go to the location and see what is needed, but a description can help. The form is built around that sentence rather than around the catalogue.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/farmflow/07-landscaping.webp",
            alt: "Landscaping requests — counts by status, and four request types: new planting, replacement plant, event greenery and maintenance",
            caption: "Four ways into a landscaping request. Maintenance was added after the first round, because pruning a hedge is neither a new plant nor a dead one.",
            width: 1600,
            height: 1000,
          },
          {
            src: "/images/farmflow/08-new-landscaping-request.webp",
            alt: "New landscaping request — request type tiles, planting details with an optional plant picker, a description field, and a quick-tips panel",
            caption: "The plant picker says optional in the label. The description field is where the real information ends up.",
            width: 1600,
            height: 1000,
          },
        ],
      },
      {
        heading: "Reserving the Farm Itself",
        paragraphs: [
          "Departments wanted the farm for things that were not plant orders: a team visit, a tour for new hires, a harvest afternoon, dinner in the farm's dining space. That is a different shape of request. It has a party size, a time slot, and a question about whether someone from the farm team needs to be there.",
          "The constraint that made it work is that only slots the farm lead has opened can be booked. The reservation calendar is not a blank month you pick a day from; it is the availability manager's rules, rendered from the requester's side. If the farm is closed on Fridays, Friday is not a choice.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/farmflow/06-reserve-farm.webp",
            alt: "Reserve the farm — visiting guidelines, an open-slot picker across the week, and a form for purpose, party size and whether a team member is needed",
            caption: "Open slots are the only slots. The toggle for a farm team member is what turns a booking into a staffing question on the admin side.",
            width: 1600,
            height: 1000,
          },
          {
            src: "/images/farmflow/18-admin-reservations.webp",
            alt: "Reservations queue — pending, confirmed and team-member-requested counts, and a table of reservations with date, requester, purpose, party size and status",
            caption: "The queue from the farm side. Confirming a reservation that asked for a team member means assigning one, and it lands on the calendar next to that day's deliveries.",
            width: 1600,
            height: 1000,
          },
        ],
      },
      {
        heading: "Built for a Phone Too",
        paragraphs: [
          "A requester checking whether Thursday's flowers were approved is not at a desk when they think to check. The requester side works at phone width: the sidebar folds behind a menu button, the availability banner keeps its place at the top, and the request cards stack one to a row.",
        ],
        images: [
          {
            src: "/images/farmflow/m1-home.webp",
            alt: "Requester home on a phone — the weekly availability banner and the request cards stacked",
            caption: "Home. Same banner, same cards, one column.",
            width: 780,
            height: 1688,
          },
          {
            src: "/images/farmflow/m2-new-request.webp",
            alt: "New request on a phone — category tiles and the details form stacked",
            caption: "New request. The category tiles wrap to two across.",
            width: 780,
            height: 1688,
          },
          {
            src: "/images/farmflow/m3-my-requests.webp",
            alt: "My requests on a phone — status counts and the request list",
            caption: "My requests. Status counts first, then the list.",
            width: 780,
            height: 1688,
          },
          {
            src: "/images/farmflow/m4-request-details.webp",
            alt: "Request details on a phone — the timeline and quick actions stacked",
            caption: "A ticket. The timeline reads top to bottom, the actions sit under it.",
            width: 780,
            height: 1688,
          },
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "A farm green for headings and the primary action, a sage for secondary text, cream for the surface, and Tailwind's stock status colours that only ever mean where a request is in its life. Everything sits on Tailwind's spacing scale so twenty-two hand-written pages stay on one grid.",
          "The sage is the one that bit me. It measured 2.90:1 on white, on roughly eleven hundred pieces of secondary text at twelve to fourteen pixels, and it had looked fine to me for weeks. Fixing it took three passes to find a value that cleared 4.5:1 on white, on the cream, and on the darker banner at the same time. Chip text, white-on-fill buttons and the link colours failed in the same sweep and were darkened with it.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/farmflow/14-catalog.webp",
            alt: "Catalog and templates manager — what's available this week, the flowers catalogue with stock counts, catalogue tools and recent activity",
            caption: "The catalogue the request form reads from. Lead times and stock live here, so a requester sees them before they ask.",
            width: 1600,
            height: 1000,
          },
          {
            src: "/images/farmflow/15-admin-reports.webp",
            alt: "Reports and analytics — total requests, fulfilment rate, on-time delivery, and volume by department and category",
            caption: "Reports. Fulfilment and on-time rates by department, which is what the farm lead takes into the budget conversation.",
            width: 1600,
            height: 1000,
          },
        ],
      },
      {
        heading: "The Build That Existed Nowhere",
        paragraphs: [
          "The part I got wrong was not on any screen. I had been shipping this by dragging a folder onto Netlify, fast, from wherever I was working, and at some point the working copy stopped being on any machine I owned. The live site was version twenty-nine. The most recent thing on disk was the twelve-screen July prototype.",
          "I got it back by mirroring the deployed pages off Netlify into a repository, which means the project's history starts from the live build rather than from how it was written. It works, and every page since has gone through git. But it is a mistake that is specific to building this fast with AI: when producing a new version costs almost nothing, you stop treating any one of them as the thing you would be sorry to lose.",
        ],
      },
      {
        heading: "Where It Is",
        paragraphs: [
          "It is live at farmflow-app.netlify.app as a fully clickable build: twenty-two screens across four roles, every flow working, with demo data seeded in the browser. A twenty-two test Playwright suite covers sign-in for each role, the request lifecycle, approvals, reservations, search and the help centre, and it runs against the live site.",
          "What it is not yet is connected to anything. The requirements document specifies the tables, the row-level security and the storage buckets. None of that is wired. That is the next phase, along with real sign-in, email notifications that honour each person's preferred contact method, and the honey and eggs categories that are designed and waiting behind a flag.",
          "It is here as the front half of a product done properly: a real problem, a stakeholder whose feedback changed the structure and not just the copy, and a build you can hand to the people who will use it before a single database table exists.",
        ],
      },
    ]}
  />
);

export default StructuredFarmFlowCaseStudy;
