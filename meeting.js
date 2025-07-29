// Sample data
const meetingsData = [
  {
    id: 1,
    title: "Product Demo: Tata Consultancy",
    description: "Demonstration of our Enterprise CRM Suite",
    type: "Demo",
    date: "2025-05-21T11:00:00",
    endTime: "2025-05-21T12:00:00",
    executive: "Priya Sharma",
    executiveId: 1,
    attendees: [
      { name: "Rajesh Kumar - CEO", isManager: false },
      { name: "Ananya Desai - CTO", isManager: false },
      { name: "Rahul Sharma (Manager)", isManager: true },
    ],
    feedback: "",
    status: "Scheduled",
    managerTagged: true,
    location: "Virtual - Zoom",
  },
  {
    id: 2,
    title: "Follow-up: Infosys",
    description: "Follow-up discussion on the proposal sent last week",
    type: "Follow-up",
    date: "2025-05-21T14:30:00",
    endTime: "2025-05-21T15:00:00",
    executive: "Arjun Patel",
    executiveId: 2,
    attendees: [{ name: "Vikram Reddy - Project Manager", isManager: false }],
    feedback: "",
    status: "Scheduled",
    managerTagged: false,
    location: "Phone Call",
  },
  {
    id: 3,
    title: "Negotiation: Reliance Digital",
    description: "Contract negotiation for the Analytics Dashboard module",
    type: "Negotiation",
    date: "2025-05-23T13:00:00",
    endTime: "2025-05-23T14:00:00",
    executive: "Joshitha Reddy",
    executiveId: 3,
    attendees: [
      { name: "Priya Mehta - Procurement", isManager: false },
      { name: "Arjun Singh - Legal", isManager: true },
    ],
    feedback: "",
    status: "Scheduled",
    managerTagged: true,
    location: "Office - Conference Room A",
  },
  {
    id: 4,
    title: "Product Demo: Mahindra Tech",
    description: "Demonstration of our Analytics Dashboard features",
    type: "Demo",
    date: "2025-05-20T14:00:00",
    endTime: "2025-05-20T15:00:00",
    executive: "Vikram Singh",
    executiveId: 4,
    attendees: [{ name: "Karthik Iyer - Founder", isManager: false }],
    feedback: "Client expressed interest in the premium tier. Follow up with detailed proposal.",
    status: "Completed",
    managerTagged: false,
    location: "Virtual - Teams",
    attendedOn: "2025-05-20T15:05:00",
  },
  {
    id: 5,
    title: "Product Demo: Analytics Module",
    description: "Demonstration of our Analytics Module capabilities and integration options",
    type: "Demo",
    date: "2025-05-20T15:00:00",
    endTime: "2025-05-20T16:00:00",
    executive: "Priya Sharma",
    executiveId: 1,
    attendees: [
      { name: "Rahul Mehta - Data Scientist", isManager: false },
      { name: "Ananya Desai - CIO", isManager: true },
    ],
    feedback: "Client had concerns about data security. Share our compliance documentation.",
    status: "Completed",
    managerTagged: true,
    location: "Virtual - Zoom",
    attendedOn: "2025-05-20T16:10:00",
  },
]

const executivesData = [
  { id: 1, name: "Priya Sharma" },
  { id: 2, name: "Arjun Patel" },
  { id: 3, name: "Joshitha Reddy" },
  { id: 4, name: "Vikram Singh" },
]

const leadsData = {
  1: {
    name: "Rajesh Kumar",
    company: "Tata Consultancy Services",
    email: "rajesh.kumar@tcs.com",
    phone: "+91 98765 43210",
    position: "CEO",
    agenda:
      "Evaluate Enterprise CRM Suite for digital transformation initiative. Discuss integration capabilities with existing SAP systems.",
    requirements: ["Multi-tenant architecture", "API integrations", "Custom reporting", "Mobile access"],
    budget: "₹50-75 Lakhs",
    timeline: "Q2 2025 implementation",
  },
  2: {
    name: "Vikram Reddy",
    company: "Infosys Limited",
    email: "vikram.reddy@infosys.com",
    phone: "+91 87654 32109",
    position: "Project Manager",
    agenda: "Follow-up on proposal submitted last week. Address technical concerns raised by the development team.",
    requirements: ["Cloud deployment", "Data migration support", "Training programs"],
    budget: "₹25-40 Lakhs",
    timeline: "Q3 2025 rollout",
  },
  3: {
    name: "Priya Mehta",
    company: "Reliance Digital",
    email: "priya.mehta@reliancedigital.in",
    phone: "+91 76543 21098",
    position: "Procurement Head",
    agenda: "Contract negotiation for Analytics Dashboard module. Finalize pricing and implementation timeline.",
    requirements: ["Real-time analytics", "Custom dashboards", "Data visualization"],
    budget: "₹30-45 Lakhs",
    timeline: "Immediate deployment",
  },
  4: {
    name: "Karthik Iyer",
    company: "Mahindra Tech",
    email: "karthik.iyer@mahindratech.com",
    phone: "+91 65432 10987",
    position: "Founder & CTO",
    agenda: "Explore Analytics Dashboard features for startup operations. Understand scalability options.",
    requirements: ["Startup-friendly pricing", "Quick setup", "Basic analytics"],
    budget: "₹5-10 Lakhs",
    timeline: "Q4 2025",
  },
  5: {
    name: "Rahul Mehta",
    company: "DataTech Solutions",
    email: "rahul.mehta@datatech.com",
    phone: "+91 54321 09876",
    position: "Data Scientist",
    agenda: "Technical deep-dive into Analytics Module capabilities. Discuss data security and compliance features.",
    requirements: ["Advanced analytics", "ML integration", "Data security compliance"],
    budget: "₹40-60 Lakhs",
    timeline: "Q1 2026",
  },
}

let currentSelectedMeeting = null
let managerAvailable = false

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

function formatDateTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function getBadgeClass(type) {
  switch (type) {
    case "Demo":
      return "badge-demo"
    case "Follow-up":
      return "badge-followup"
    case "Negotiation":
      return "badge-negotiation"
    default:
      return "badge-demo"
  }
}

function getStatusBadgeClass(status) {
  return status === "Scheduled" ? "badge-scheduled" : "badge-completed"
}

// Tab switching
function switchTab(tabName) {
  // Update tab triggers
  document.querySelectorAll(".tab-trigger").forEach((trigger) => {
    trigger.classList.remove("active")
  })
  event.target.classList.add("active")

  // Update tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active")
  })
  document.getElementById(tabName + "-tab").classList.add("active")

  // Note: Removed renderMeetingsTable() call since table is now static in HTML
}

// Calendar generation
function generateCalendar() {
  const calendarGrid = document.getElementById("calendar-grid")
  const today = new Date()
  const currentDay = today.getDate()

  // Generate 35 days (5 weeks)
  for (let i = 1; i <= 35; i++) {
    const dayDiv = document.createElement("div")
    dayDiv.className = "calendar-day"

    if (i === 22) {
      // Assuming today is the 22nd
      dayDiv.classList.add("today")
    }

    const hasMeeting = [20, 21, 22, 23].includes(i)

    dayDiv.innerHTML = `
            <div class="calendar-day-number">${i}</div>
            ${hasMeeting ? '<div class="meeting-indicator"><div class="meeting-dot"></div><div class="meeting-dot"></div></div>' : ""}
        `

    if (hasMeeting) {
      dayDiv.onclick = () => openDayMeetingsModal(new Date(2025, 4, i))
    }

    calendarGrid.appendChild(dayDiv)
  }
}

// Timeline rendering
function renderTimeline() {
  const upcomingMeetings = meetingsData.filter((m) => m.status === "Scheduled")
  const completedMeetings = meetingsData.filter((m) => m.status === "Completed")

  renderMeetingsTimeline("upcoming-meetings-timeline", upcomingMeetings)
  renderMeetingsTimeline("completed-meetings-timeline", completedMeetings)
}

function renderMeetingsTimeline(containerId, meetings) {
  const container = document.getElementById(containerId)
  const grouped = groupMeetingsByDate(meetings)

  let html = ""
  Object.entries(grouped).forEach(([dateGroup, groupMeetings]) => {
    if (groupMeetings.length > 0) {
      html += `
                <div class="timeline-item">
                    <h3 class="timeline-date">${dateGroup}</h3>
                    <div style="margin-left: 8px;">
                        ${groupMeetings.map((meeting) => renderMeetingCard(meeting)).join("")}
                    </div>
                </div>
            `
    }
  })

  container.innerHTML = html
}

function groupMeetingsByDate(meetings) {
  const groups = {
    Today: [],
    Tomorrow: [],
    "This Week": [],
    "Next Week": [],
  }

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  meetings.forEach((meeting) => {
    const meetingDate = new Date(meeting.date)
    const diffTime = Math.abs(meetingDate.getTime() - today.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (meetingDate.toDateString() === today.toDateString()) {
      groups["Today"].push(meeting)
    } else if (meetingDate.toDateString() === tomorrow.toDateString()) {
      groups["Tomorrow"].push(meeting)
    } else if (diffDays <= 7) {
      groups["This Week"].push(meeting)
    } else {
      groups["Next Week"].push(meeting)
    }
  })

  return groups
}

function renderMeetingCard(meeting) {
  return `
        <div class="meeting-card ${meeting.managerTagged ? "manager-tagged" : ""}" onclick="openMeetingDetailsModal(${meeting.id})">
            <div class="flex items-center gap-2 mb-2">
                <h3 style="font-weight: 500;">${meeting.title}</h3>
                <span class="badge ${getBadgeClass(meeting.type)}">${meeting.type}</span>
                <span class="badge ${meeting.managerTagged ? "badge-manager-tagged" : "badge-not-tagged"}">
                    ${meeting.managerTagged ? "✓ Manager Tagged" : "⚠ Not Tagged"}
                </span>
            </div>
            
            <div class="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <div class="flex items-center gap-1">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>${formatTime(meeting.date)} - ${formatTime(meeting.endTime)}, ${formatDate(meeting.date)}</span>
                </div>
                <div class="flex items-center gap-1">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z"/>
                    </svg>
                    <span>${meeting.location}</span>
                </div>
            </div>
            
            <p class="text-sm text-gray-600 mb-3">${meeting.description}</p>
            
            <div class="flex items-center gap-2 mb-3">
                <div class="avatar avatar-sm">${getInitials(meeting.executive)}</div>
                <span class="text-sm">${meeting.executive}</span>
            </div>
            
            <div class="mb-3">
                <p class="text-xs text-gray-400 mb-2">Participants:</p>
                <div class="participant-list">
                    ${meeting.attendees
                      .map(
                        (attendee) => `
                        <div class="participant-item">
                            <div class="avatar avatar-xs">${getInitials(attendee.name)}</div>
                            <span class="text-xs">${attendee.name}</span>
                            ${attendee.isManager ? '<span class="badge badge-demo" style="height: 16px; padding: 0 4px; font-size: 10px;">Manager</span>' : ""}
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            
            ${
              meeting.feedback
                ? `
                <div class="feedback-box">
                    <div class="feedback-header">
                       <i class="fa-regular fa-message"></i>
                        <span class="text-sm" style="font-weight: 500;">Manager Feedback</span>
                    </div>
                    <p class="feedback-text">${meeting.feedback}</p>
                </div>
            `
                : ""
            }
            
            <button class="btn btn-outline btn-sm mt-2" onclick="event.stopPropagation(); openFeedbackModal(${meeting.id})">
                <i class="fa-solid fa-comment"></i>
                ${meeting.feedback ? "Edit Feedback" : "Add Feedback"}
            </button>
        </div>
    `
}

// Modal functions
function openAddManagerModal() {
  document.getElementById("add-manager-modal").classList.remove("hidden")
}

function closeAddManagerModal() {
  document.getElementById("add-manager-modal").classList.add("hidden")
}

function openFeedbackModal(meetingId) {
  const meeting = meetingsData.find((m) => m.id === meetingId)
  currentSelectedMeeting = meeting

  document.getElementById("feedback-meeting-info").innerHTML = `
        <h3 style="font-size: 18px; font-weight: 500; color: #170f5f;">${meeting.title}</h3>
        <p class="text-gray-500 text-sm">${formatDateTime(meeting.date)} · ${formatTime(meeting.date)} - ${formatTime(meeting.endTime)}</p>
        <span class="badge ${getBadgeClass(meeting.type)} mt-2">${meeting.type}</span>
    `

  document.getElementById("feedback-text").value = meeting.feedback || ""
  document.getElementById("feedback-modal").classList.remove("hidden")
}

function closeFeedbackModal() {
  document.getElementById("feedback-modal").classList.add("hidden")
  currentSelectedMeeting = null
}

function openMeetingDetailsModal(meetingId) {
  const meeting = meetingsData.find((m) => m.id === meetingId)
  const leadInfo = leadsData[meetingId] || {
    name: "Unknown Lead",
    company: "Unknown Company",
    email: "N/A",
    phone: "N/A",
    position: "N/A",
    agenda: "No agenda provided",
    requirements: [],
    budget: "Not specified",
    timeline: "Not specified",
  }

  managerAvailable = meeting.managerTagged

  document.getElementById("meeting-details-content").innerHTML = `
        <div>
            <div style="margin-bottom: 24px;">
                <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 8px; color: #170f5f;">${meeting.title}</h2>
                <p style="color: #6b7280; margin-bottom: 16px;">${meeting.description}</p>
                
                <div style="margin-bottom: 12px; font-size: 14px;">
                    <div class="flex items-center gap-2" style="margin-bottom: 12px;">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>${formatDateTime(meeting.date)}</span>
                    </div>
                    <div class="flex items-center gap-2" style="margin-bottom: 12px;">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>${formatTime(meeting.date)} - ${formatTime(meeting.endTime)}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z"/>
                        </svg>
                        <span>${meeting.location}</span>
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 24px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #170f5f;">Sales Executive</h3>
                <div class="flex items-center gap-3" style="padding: 12px; background-color: #f9fafb; border-radius: 8px;">
                    <div class="avatar">${getInitials(meeting.executive)}</div>
                    <div>
                        <p style="font-weight: 500;">${meeting.executive}</p>
                        <p class="text-sm text-gray-500">Sales Executive</p>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #170f5f;">Attendees</h3>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${meeting.attendees
                      .map(
                        (attendee) => `
                        <div class="flex items-center gap-3" style="padding: 8px; background-color: #f9fafb; border-radius: 8px;">
                            <div class="flex items-center gap-3">
    <div class="avatar avatar-sm">${getInitials(attendee.name)}</div>
    <div class="flex-1">
        <p class="text-sm" style="font-weight: 500;">${attendee.name}</p>
        ${attendee.isManager ? '<p class="text-xs text-gray-500">Manager</p>' : ""}
    </div>
</div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        </div>
        
        <div>
            <div style="margin-bottom: 24px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #170f5f;">Lead Information</h3>
                <div class="lead-info">
                    <div>
                        <h3>${leadInfo.name}</h3>
                        <p>${leadInfo.position} at ${leadInfo.company}</p>
                    </div>
                    
                    <div class="lead-details">
                        <div class="lead-detail-item">
                            <span class="lead-detail-label">Email:</span>
                            <span class="lead-detail-value">${leadInfo.email}</span>
                        </div>
                        <div class="lead-detail-item">
                            <span class="lead-detail-label">Phone:</span>
                            <span>${leadInfo.phone}</span>
                        </div>
                        <div class="lead-detail-item">
                            <span class="lead-detail-label">Budget:</span>
                            <span>${leadInfo.budget}</span>
                        </div>
                        <div class="lead-detail-item">
                            <span class="lead-detail-label">Timeline:</span>
                            <span>${leadInfo.timeline}</span>
                        </div>
                    </div>
                    
                    <div>
                        <p style="font-weight: 500; margin-bottom: 8px;">Meeting Agenda:</p>
                        <p class="text-sm text-gray-600">${leadInfo.agenda}</p>
                    </div>
                    
                    ${
                      leadInfo.requirements.length > 0
                        ? `
                        <div>
                            <p style="font-weight: 500; margin-bottom: 8px;">Key Requirements:</p>
                            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                                ${leadInfo.requirements.map((req) => `<span style="background-color: #f3f4f6; color: #374151; padding: 4px 8px; border-radius: 4px; font-size: 12px; border: 1px solid #e5e7eb;">${req}</span>`).join("")}
                            </div>
                        </div>
                    `
                        : ""
                    }
                </div>
            </div>
            
            <div style="margin-bottom: 24px;">
                <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 12px; color: #170f5f;">Manager Availability</h3>
                <div class="availability-section">
                    <div class="availability-toggle">
                        <span style="font-weight: 500;">Available for this meeting:</span>
                        <div class="toggle-switch ${managerAvailable ? "active" : ""}" onclick="toggleAvailability()"></div>
                    </div>
                    
                    <div class="availability-options ${!managerAvailable ? "show" : ""}" id="availability-options">
                        <div class="form-group">
                            <label class="form-label text-sm">When will you be available?</label>
                            <select class="form-select">
                                <option value="">Select a time slot</option>
                                <option value="30min-before">30 minutes before</option>
                                <option value="1hour-before">1 hour before</option>
                                <option value="2hours-before">2 hours before</option>
                                <option value="next-day">Next day same time</option>
                                <option value="custom">Custom time (specify below)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label text-sm">Additional notes:</label>
                            <textarea class="form-textarea" placeholder="Specify your availability or any constraints..." rows="3"></textarea>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%; background-color: #170f5f; border-color: #fafafa;" onclick="handleSaveAvailability()">
                        Save Availability
                    </button>
                </div>
            </div>
            
            <div class="flex gap-2">
                <button class="btn btn-outline flex-1" onclick="openFeedbackModal(${meeting.id})">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.456L3 21l2.456-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"/>
                    </svg>
                    Add Feedback
                </button>
                <button class="btn btn-outline flex-1">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z"/>
                    </svg>
                    Join Meeting
                </button>
            </div>
        </div>
    `

  document.getElementById("meeting-details-modal").classList.remove("hidden")
}

function closeMeetingDetailsModal() {
  document.getElementById("meeting-details-modal").classList.add("hidden")
}

function openDayMeetingsModal(date) {
  const meetingsForDate = meetingsData.filter((meeting) => {
    const meetingDate = new Date(meeting.date)
    return meetingDate.toDateString() === date.toDateString()
  })

  document.getElementById("day-meetings-title").textContent = `Meetings on ${formatDateTime(date)}`

  if (meetingsForDate.length > 0) {
    document.getElementById("day-meetings-content").innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 16px;">
                ${meetingsForDate
                  .map(
                    (meeting) => `
                    <div class="day-meeting-card" onclick="openMeetingDetailsModal(${meeting.id})">
                        <h3>${meeting.title}</h3>
                        <div class="meeting-time">
                            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span>${formatTime(meeting.date)} - ${formatTime(meeting.endTime)}</span>
                        </div>
                        <div class="meeting-location">
                            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z"/>
                            </svg>
                            <span>${meeting.location}</span>
                        </div>
                        <p style="font-size: 14px; margin: 8px 0; opacity: 0.9;">${meeting.description}</p>
                        <span class="meeting-type-badge">${meeting.type}</span>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        `
  } else {
    document.getElementById("day-meetings-content").innerHTML =
      '<p class="text-gray-500">No meetings scheduled for this day.</p>'
  }

  document.getElementById("day-meetings-modal").classList.remove("hidden")
}

function closeDayMeetingsModal() {
  document.getElementById("day-meetings-modal").classList.add("hidden")
}

// Handler functions
function handleAddManager() {
  const executiveSelect = document.getElementById("executive-select")
  const meetingSelect = document.getElementById("meeting-select")

  if (executiveSelect.value && meetingSelect.value) {
    alert("Manager added to meeting successfully!")
    closeAddManagerModal()
  } else {
    alert("Please select both an executive and a meeting.")
  }
}

function handleSaveFeedback() {
  const feedbackText = document.getElementById("feedback-text").value

  if (currentSelectedMeeting && feedbackText.trim()) {
    currentSelectedMeeting.feedback = feedbackText
    alert("Feedback saved successfully!")
    closeFeedbackModal()
    renderTimeline()
    // Note: No need to call renderMeetingsTable() since table is now static
  } else {
    alert("Please enter feedback before saving.")
  }
}

function handleSaveAvailability() {
  alert("Availability saved successfully!")
  closeMeetingDetailsModal()
}

function toggleAvailability() {
  managerAvailable = !managerAvailable
  const toggle = document.querySelector(".toggle-switch")
  const options = document.getElementById("availability-options")

  if (managerAvailable) {
    toggle.classList.add("active")
    options.classList.remove("show")
  } else {
    toggle.classList.remove("active")
    options.classList.add("show")
  }
}

// Event listeners
document.getElementById("executive-select").addEventListener("change", function () {
  const executiveId = Number.parseInt(this.value)
  const meetingSelect = document.getElementById("meeting-select")

  if (executiveId) {
    const executive = executivesData.find((e) => e.id === executiveId)
    const executiveMeetings = meetingsData.filter((m) => m.status === "Scheduled" && m.executive === executive.name)

    meetingSelect.disabled = false
    meetingSelect.innerHTML =
      '<option value="">Select a meeting</option>' +
      executiveMeetings
        .map(
          (meeting) =>
            `<option value="${meeting.id}">${meeting.title} - ${formatDate(meeting.date)}, ${formatTime(meeting.date)}</option>`,
        )
        .join("")
  } else {
    meetingSelect.disabled = true
    meetingSelect.innerHTML = '<option value="">Select an executive first</option>'
  }
})

// Note: Removed search and filter event listeners since table is now static in HTML

// Close modals when clicking outside
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.add("hidden")
    }
  })
})

// DOM Elements
const sidebar = document.getElementById("sidebar")
const mainContent = document.getElementById("mainContent")
const collapseBtn = document.getElementById("collapseBtn")
const topSearchBar = document.getElementById("topSearchBar")

// Toggle sidebar
collapseBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed")
  mainContent.classList.toggle("expanded")
  topSearchBar.classList.toggle("expanded")
})

// Responsive adjustments
function adjustForMobile() {
  if (window.innerWidth <= 768) {
    sidebar.classList.add("collapsed")
    mainContent.classList.add("expanded")
  }
}

// Initial call for mobile adjustment
adjustForMobile()

// Listen for window resize
window.addEventListener("resize", adjustForMobile)

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  generateCalendar()
  renderTimeline()
  // Note: Removed renderMeetingsTable() call since table is now static in HTML
})
