import React from "react";

const URL = "https://nextjs-demo-1e45a-default-rtdb.firebaseio.com/events.json";

export async function getAllEvents() {
  const res = await fetch(URL);
  const data = await res.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
