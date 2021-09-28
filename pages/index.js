import React from "react";
import Link from "next/link";
import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/EventList";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <ul>
        <li>
          <EventList items={featuredEvents} />
        </li>
      </ul>
    </div>
  );
}
