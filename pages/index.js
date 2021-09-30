import React from "react";
import Link from "next/link";
import { getFeaturedEvents } from "../components/helpers/api";
import EventList from "../components/events/EventList";

export default function HomePage({ featuredEvents }) {
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

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
  };
}
