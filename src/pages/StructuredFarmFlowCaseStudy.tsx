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
          "The two screens here are from that July build. They are the version the stakeholder reacted to, which is the point of building a clickable one first.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/farmflow/july-02-requester-home.webp",
            alt: "July prototype of the requester home — a top navigation bar with Home, New Request, My Requests, Locations and Admin, above the weekly availability banner and four request cards",
            caption: "Requester home, July. A five-item top bar and four ways in. Compare it with the version at the top of this page: the bar became a sidebar, and Landscaping and Reserve Farm did not exist yet.",
            width: 1400,
            height: 875,
          },
          {
            src: "/images/farmflow/july-03-new-request.webp",
            alt: "July prototype of the new request form — category tiles for flowers, herbs, vegetables, service and special, and the request details form",
            caption: "New request, July. Five categories, no Fruits, and no department code or budget line on the form. Every one of those came from the feedback round.",
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
      },
      {
        heading: "Four Roles, and Who Can Touch Availability",
        paragraphs: [
          "A requester sees their own department's requests and nothing else. The farm admin sees everything. The operations admin sees everything the farm admin does, and the one control they do not have is the farm's opening hours and reservation slots. The landscaping admin sees the landscaping catalogue and queue, and none of the farm's.",
          "The interesting one is that missing control. It would have been easier to make Operations Admin a copy of Farm Admin with one checkbox unticked. Instead every admin capability is a named privilege, and a role is just a default set of them. That way the farm lead can grant or revoke one thing without inventing a new role, and when honey and eggs arrive and somebody needs a kitchen role, it is a row of toggles rather than a schema change.",
        ],
        images: [
          {
            src: "/images/farmflow/16-availability-manager.webp",
            alt: "Availability manager — a weekly schedule of open days, time slots and staffed windows, with a note that only the main admin can edit it",
            caption: "The one screen an operations admin can see but not change. Which days the farm is open, which slots can be booked, and whether a team member will be there. Everything else on the admin side they can work; this is the line.",
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
        images: [
          {
            src: "/images/farmflow/12-request-ticket.webp",
            alt: "Admin request ticket — universal request details, the department, location, need-by date, delivery method and budget line, and quick actions to approve, request info, schedule, upload a photo or fulfil",
            caption: "The request from the farm side. Approve, ask for more information, schedule, attach the confirmation photo, mark it fulfilled, or reject it, all from one column. Every one of those writes to the timeline the requester sees.",
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
      },
      {
        heading: "Reserving the Farm Itself",
        paragraphs: [
          "Departments wanted the farm for things that were not plant orders: a team visit, a tour for new hires, a harvest afternoon, dinner in the farm's dining space. That is a different shape of request. It has a party size, a time slot, and a question about whether someone from the farm team needs to be there.",
          "The constraint that made it work is that only slots the farm lead has opened can be booked. The reservation calendar is not a blank month you pick a day from; it is the availability manager's rules, rendered from the requester's side. If the farm is closed on Fridays, Friday is not a choice.",
        ],
        images: [
          {
            src: "/images/farmflow/13-admin-calendar.webp",
            alt: "Admin calendar — a week of deliveries and reservations colour-coded by type, with today's schedule listed alongside",
            caption: "A confirmed reservation lands on the same calendar as that day's deliveries, in its own colour, because both are competing for the same team on the same morning.",
            width: 1600,
            height: 1000,
          },
          {
            src: "/images/farmflow/m6-reserve-farm.webp",
            alt: "Reserve the farm on a phone — visiting guidelines, then the open-slot picker and booking form",
            caption: "The requester's side of it. Only slots the farm lead has opened are offered, so a closed Friday is simply not there to pick.",
            width: 780,
            height: 1688,
          },
        ],
      },
      {
        heading: "Built for a Phone Too",
        paragraphs: [
          "A requester checking whether Thursday's flowers were approved is not at a desk when they think to check. The whole requester side works at phone width: the sidebar folds behind a menu button, the availability banner keeps its place at the top, and the request cards stack one to a row. This is the longest form in the app, which is the screen that decides whether that claim is true.",
        ],
        images: [
          {
            src: "/images/farmflow/m2-new-request.webp",
            alt: "New request on a phone — category tiles two across, then the details form and order summary stacked",
            caption: "The longest form in the app on a phone. Tiles go two across, the summary panel drops below the form, and nothing is hidden behind a tab.",
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
