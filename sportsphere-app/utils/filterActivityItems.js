import React from 'react'
import { parse } from 'date-fns';


export default function filterActivityItems(activityItems, searchQuery) {

    const filteredActivityItems = activityItems.filter(item => {
        const now = new Date(); // Current date and time
        const itemDate = parse(item.date, 'MMM dd, yyyy', new Date());
        const itemTime = parse(item.time, 'HH:mm', new Date());
        itemDate.setHours(itemTime.getHours(), itemTime.getMinutes(), 0);
    
        // Check if the item's date is after now
        if (itemDate <= now) return false;
        const terms = searchQuery.toLowerCase().split(' ');
      
        // Check if any term matches activityName, venue, description, or date
        return terms.some(term =>
          item.activityName.toLowerCase().includes(term) ||
          item.venue.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.date.toLowerCase().includes(term)
        );
      });
  return filteredActivityItems;
}
