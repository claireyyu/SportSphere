// This file contains utility functions for interacting with the Firestore database.

export function manageReminder(doc, items) {
    const data = doc.data();
    if (data.time && data.date) {
      const dtDate = new Date(data.date.seconds * 1000);
      const date = dtDate.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
      const dtTime = new Date(data.time.seconds * 1000);
      const time = dtTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      items.push({
        ...data,
        id: doc.id,
        time,
        date,
        dtCombined: new Date(`${dtDate.toISOString().split('T')[0]}T${time}:00`)
      });
    } else {
      console.log("Missing date or time for reminder:", doc.id);
    }
  }

export function manageActivity(doc, items) {
    const data = doc.data();
    if (data.time && data.date && data.activityName && data.venue && data.totalMembers && data.description && data.peopleGoing) {
      const dtDate = new Date(data.date.seconds * 1000);
      const date = dtDate.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
      const dtTime = new Date(data.time.seconds * 1000);
      const time = dtTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      const activityName = data.activityName;
      const venue = data.venue;
      const totalMembers = data.totalMembers;
      const description = data.description;
      const peopleGoing = data.peopleGoing;

      items.push({
        ...data,
        id: doc.id,
        time,
        date,
        dtCombined: new Date(`${dtDate.toISOString().split('T')[0]}T${time}:00`)
      });
    } else {
      console.log("Missing date or time for Activity:", doc.id);
    }
}
