import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getAllEvents, getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

export default function EventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function findEvents(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }
  return (
    <div>
      <EventsSearch onSearch={findEvents} />
      <EventList items={events} />
    </div>
  );
}
