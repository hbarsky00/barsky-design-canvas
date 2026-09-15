import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredFarmFlowCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="farmflow"
    title="FarmFlow"
    description="An organization that accepted plant requests by email and telephone. That system has replaced the inbox and is still under development."
    tags={["Internal Tools", "Operations", "AI-Assisted Product", "Solo Build"]}
    meta={[
      { label: "Role", value: "Designer & Developer" },
      { label: "Status", value: "Clickable build, backend next" },
    ]}
    liveUrl="https://farmflow-app.netlify.app"
    heroImage={{
      src: "/images/farmflow/card-phones.webp",
      hoverVideo: "/farmflow-card.mp4",
      alt: "FarmFlow on a phone: new request, my requests, a request's timeline, and reserving the farm",
      caption: "An organisation's farm was taking plant requests by email. Four roles, a request lifecycle with photo confirmation, landscaping and reservations — twelve screens became twenty-two after the stakeholder's feedback.",
      width: 1600,
      height: 1000,
    }}
    blocks={[
      {
        heading: "A Farm That Ran on Email",
        paragraphs: [
          "An organization that had its own farm and landscaping took requests from all other departments by email and telephone. For example, they would ask for flowers to be supplied for an event, for herbs to be given to the kitchen, or for a replacement shrub to be found by the eastern entrance. The requests would come in whatever form the person making them wanted, and then the farm team would handle the rest of the arrangements.",
          "The stakeholder gave the reason for the systematization as being \"great for efficiency and for clarifying mutual expectations\"; the word \"mutual\" is the key one. The farm did not know which departments would request what, and the departments didn't know what the farm could grow or how long it took. No one was being difficult; there was just no common area where either side could see the other.",
          "It was a request system in which both parties could see the same information\u2014what is available this week, what has been asked for, where it stands in the process, and when it will arrive.",
        ],
        images: [
        ],
      },
      {
        heading: "Twelve Screens Before a Line of Code",
        paragraphs: [
          "I began the project in July with twelve screens and a requirements document, and I prepared it so a coding agent could create one page at a time from it. For each page, I wrote a separate build prompt that specified what the page does, who can see it, all the states it can be in, and that it must match pixel for pixel.",
          "That sounds as though it were done for the sake of the process; in fact it wasn't. By writing a prompt for each page, I was forced to make decisions about things a Figma file lets you leave vague, such as what an admin sees when there are no requests yet or what happens when a requester opens a ticket that has moved to a status they cannot act on.",
          "The screens shown here are from the July build; they were the version the stakeholder responded to, which is why it was necessary to produce a clickable one first.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/farmflow/july-02-requester-home.webp",
            alt: "July prototype of the requester home: a top navigation bar with Home, New Request, My Requests, Locations and Admin, above the weekly availability banner and four request cards",
            caption: "In July the requester went home, with a top bar having five items and four ways in. Compare this with the version at the top of the page: in that case, the bar had become a sidebar, and Landscaping and Reserve Farm did not exist yet.",
            width: 1400,
            height: 875,
          },
          {
            src: "/images/farmflow/july-03-new-request.webp",
            alt: "July prototype of the new request form: category tiles for flowers, herbs, vegetables, service and special, and the request details form",
            caption: "The request was made in July; it included five categories, omitted Fruits, and had no department code or budget line on the form. We got all of these details from the feedback round.",
            width: 1400,
            height: 875,
          },
        ],
      },
      {
        heading: "What the Feedback Added",
        paragraphs: [
          "The stakeholder provided a list and almost all of the items on it were not merely cosmetic. It was necessary to have a separate category for fruits. Since honey and eggs were going to be included, provisions had to be made for them even if they were shipped under a flag. Each request had to have a department code and a budget line so that it could be charged back. Email had to be the preferred method of contact, with the phone serving as a backup rather than the other way around.",
          "Two of the items consisted of complete modules since the landscaping required its own request type and its own admin interface, as a dead hedge is not a flower order; also, the departments wanted to book the farm as a whole for tours, team events and harvest days, so the farm team needed a means of indicating which days and time slots were available.",
          "A single item split a role into two. The farm leader wanted additional admins who could manage the queue and maintain the calendar day to day, but who should not be able to change the farm's opening hours. This led to the creation of an Operations Admin, and the reason permissions in the list are individual privileges rather than role labels. After the list was reviewed, twelve screens became twenty-two.",
        ],
      },
      {
        heading: "Four Roles, and Who Can Touch Availability",
        paragraphs: [
          "A requester can see only requests in their own department. The farm administrator can access all requests. The operations administrator can see all actions carried out by the farm administrator, except for the farm's opening hours and reservation slots. The landscaping administrator sees only the landscaping catalogue and queue, and not any of the farm's other items.",
          "It would have been simpler to make Operations Admin a duplicate of Farm Admin by just leaving one checkbox unchecked, and it's precisely because of that missing control that I didn't do it. Since every admin capability is a named privilege and a role is merely a default collection of such privileges, the farm leader is able to grant or revoke a particular privilege without having to create a new role, and when honey and eggs arrive and someone needs a kitchen role, instead of having to carry out a schema change there is simply a row of toggles.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/farmflow/16-availability-manager.webp",
            alt: "Availability manager: a weekly schedule of open days, time slots and staffed windows, with a note that only the main admin can edit it",
            caption: "This is the screen that an operations administrator can view but not alter; it shows which days the farm is open, which time slots can be booked, and whether a team member will be there. All the other aspects of the admin side, however, can be worked on. That's the line.",
            width: 1600,
            height: 1000,
          },
        ],
      },
      {
        heading: "The Request Is the Whole Product",
        paragraphs: [
          "All the other features are designed to take a request from a pending to a delivered status. The requester first selects a category, then chooses items from the catalogue which already have quantities and lead times listed, then picks a location from the list that is specific to their department, selects a need-by date, indicates how flexible that date is, and decides whether they want a photo taken of the item before it leaves the farm.",
          "The final one came from the farm side. Event flowers are the requests most likely to cause disappointment, and the earliest opportunity to catch this is before the van departs. So a request can ask for a photo, the farm team can attach one, and the requester can confirm it from wherever they are. Each stage of the request's progress\u2014from pending through approved, in progress, photo confirmed and fulfilled\u2014is recorded and appears on the ticket as a timeline.",
          "Needs Info is a status, not an email; when the farm team has a question, they add it to the request, the requester replies on the request, and the answer stays there when the ticket is viewed three weeks later.",
        ],
        images: [
          {
            src: "/images/farmflow/12-request-ticket.webp",
            alt: "Admin request ticket: universal request details, the department, location, need-by date, delivery method and budget line, and quick actions to approve, request info, schedule, upload a photo or fulfil",
            caption: "The request from the farm side. You can approve it, ask for more information, schedule it, attach the confirmation photo, mark it as fulfilled, or reject it, all in the same column, and each of those actions is recorded on the timeline that the requester sees.",
            width: 1600,
            height: 1000,
          },
        ],
      },
      {
        heading: "Landscaping Is Simpler on Purpose",
        paragraphs: [
          "The landscaping proposal consisted of a single sentence: the farm has more options. A landscaping request can be for a new planting, a replacement, plants needed for an event, or maintenance, and design work happens only for replacements.",
          "Normally, the person who reports a plant dying doesn't know what kind of plant it is, which is why selecting one is optional. All you have to do is upload a photo of the damage, provide a location or put a pin on the property map and then describe it in your own words, after which the landscaping team will go and have a look. The stakeholder said the landscaping team could go to the location and see what is required, although a description would help. The form is based on that statement rather than on the catalogue.",
        ],
      },
      {
        heading: "Reserving the Farm Itself",
        paragraphs: [
          "Departments have asked for the farm for reasons other than plant orders\u2014for example, to carry out a team visit, give new employees a tour, have a harvest afternoon, or have dinner in the farm's dining area. That type of request is different because it specifies the number of people attending, the time slot, and whether someone from the farm team should be present.",
          "Only those slots the farm lead has opened can be booked, and that limitation is what makes the system work. The reservation calendar reflects the availability manager's rules from the requester's point of view, so if the farm is closed on Fridays, there is no Friday to select.",
        ],
        images: [
          {
            src: "/images/farmflow/13-admin-calendar.webp",
            alt: "Admin calendar: a week of deliveries and reservations colour-coded by type, with today's schedule listed alongside",
            caption: "The caption states that a confirmed reservation appears on the same calendar as the day's deliveries, in its own color, since both compete for the same team that morning.",
            width: 1600,
            height: 1000,
          },
        ],
      },
      {
        heading: "Built for a Phone Too",
        paragraphs: [
          "When a requester checks if the flowers for Thursday have been approved, they are not at their desk. The entire requester side operates at phone width. The sidebar is hidden behind a menu button, the availability banner remains in its original position at the top, and the request cards are arranged one per row. The 'Home' option is located at the top of the page, and those are the other eight screens that a department actually uses.",
        ],
        images: [
          {
            src: "/images/farmflow/m0-sign-in.webp",
            alt: "Sign in on a phone: the FarmFlow hero panel, then Google, Microsoft and Apple sign-in and the email form",
            caption: "Sign in. The three SSO buttons come first because most of the organization logs in that way.",
            width: 780,
            height: 1688,
          },
          {
            src: "/images/farmflow/m5-locations.webp",
            alt: "Locations library on a phone: the department's locations with photos, environment and usage counts",
            caption: "The locations are listed, each accompanied by a photograph so that when a request is made it refers to a specific place.",
            width: 780,
            height: 1688,
          },
          {
            src: "/images/farmflow/m7-landscaping.webp",
            alt: "Landscaping requests on a phone: status counts and the four request types stacked",
            caption: "Landscaping; four entrances, one in each row.",
            width: 780,
            height: 1688,
          },
          {
            src: "/images/farmflow/m8-new-landscaping-request.webp",
            alt: "New landscaping request on a phone: request type, the optional plant picker and the description field",
            caption: "A request for a replacement. Include a photo, the location or a pin, and a description; the plant itself is optional.",
            width: 780,
            height: 1688,
          },
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "The farm green is used for headings and the main action, sage for secondary text, cream for the background, and the Tailwind default status colors, which always indicate where a request is in its life cycle. All the elements are based on Tailwind's spacing scale so that twenty-two pages written by hand will fit on a single grid.",
          "The sage was the one that bit me; it had a 2.90:1 ratio on white, having been tested on about eleven hundred pieces of secondary text at a size of twelve to fourteen pixels, and it had appeared satisfactory to me for weeks. It took three attempts to find a value which met the 4.5:1 requirement on white, on the cream, and on the darker banner as well. The chip text, the white-on-fill buttons and the link colours all failed during this same sweep and were darkened along with it.",
        ],
      },
      {
        heading: "The Build That Existed Nowhere",
        paragraphs: [
          "The mistake I made didn't show up on any screen. Previously, I had been sending the project over by dragging a folder onto Netlify, quickly doing so from wherever I was working, and at a certain point the version I was working on stopped being stored on any of the machines I owned. The live website was version twenty-nine while the most recent file on disk was the twelve-screen July prototype.",
          "I was able to get it back by copying the live pages from Netlify into a repository, so that the project's history now begins with the live build rather than with the original version. This method works, and all pages from that point on have been in Git. However, it is a mistake particular to the way we built this quickly using AI: whenever creating a new version of something, you stop treating any one version as something you would be sorry to lose.",
        ],
      },
      {
        heading: "Where It Is",
        paragraphs: [
          "The application is live at farmflow-app.netlify.app as a fully clickable build, featuring twenty-two screens across four different flows, with demo data already loaded in the browser. A test suite comprising twenty-two end-to-end tests covers sign-in for each role, the request lifecycle, approvals, reservations, search, and the help center, and it runs against the live site.",
          "It is not connected to anything at this stage; the requirements document lists the tables, row-level security, and storage buckets, but none of these components is currently wired up. The next phase will include real sign-in, email notifications that respect each person's preferred contact method, and the honey and eggs categories which have been designed and are waiting behind a flag.",
          "It's here as the front half of a product done properly. A real problem, a stakeholder whose feedback changed the structure as well as the copy, and a build you can hand to the people who'll use it before a single database table exists.",
        ],
      },
    ]}
  />
);

export default StructuredFarmFlowCaseStudy;
