document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");
    const prevMonthBtn = document.getElementById("prevMonthBtn");
    const nextMonthBtn = document.getElementById("nextMonthBtn");
    const currentMonthYear = document.getElementById("currentMonthYear");
    const eventList = document.getElementById("eventList");
    const eventsPanel = document.getElementById("eventsPanel");

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function renderCalendar(month, year) {
        calendar.innerHTML = "";
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Render calendar header
        currentMonthYear.textContent = `${getMonthName(month)} ${year}`;

        // Render calendar days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("calendar-day");
            dayElement.textContent = i;
            if (i === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayElement.classList.add("today");
            }
            calendar.appendChild(dayElement);
        }
    }

    function showEvents(month) {
        eventList.innerHTML = "";
        eventsData.forEach(function(event) {
            if (event.month === month && event.year === currentYear) {
                const li = document.createElement("li");
                li.textContent = event.title;
                li.classList.add("event");
                eventList.appendChild(li);
            }
        });
    }

    function showEventDetails(eventTitle) {
        alert("Showing details of event: " + eventTitle);
        
    }

    function getMonthName(monthIndex) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[monthIndex];
    }

    function updateCalendar() {
        renderCalendar(currentMonth, currentYear);
        showEvents(currentMonth);
    }

    prevMonthBtn.addEventListener("click", function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    nextMonthBtn.addEventListener("click", function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    eventsPanel.addEventListener("click", function(event) {
        if (event.target.classList.contains("event")) {
            showEventDetails(event.target.textContent);
        }
    });

    calendar.addEventListener("click", function(event) {
        if (event.target.classList.contains("calendar-day")) {
            const day = event.target.textContent;
            showEventDetails(`Event on ${getMonthName(currentMonth)} ${day}, ${currentYear}`);
        }
    });

    // Sample data of events
    const eventsData = [
   
        { title: "LOL", month: 4, year: 2024 },
        { title: "Event 3", month: 4, year: 2024 },
        // Add more events data as needed
    ];

    // Initial rendering of the calendar
    updateCalendar();
});

// Función para mostrar los detalles de un evento
function showEventDetails(eventTitle) {
    // Mostrar alerta con los detalles del evento
    alert("Showing details of event: " + eventTitle);
    
    // Mostrar detalles del evento en el lado derecho
    const eventDetails = document.getElementById("eventDetails");
    eventDetails.innerHTML = eventTitle;
}
