import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getAllEvents, getFilteredEvents } from "../../components/helpers/api";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

export default function EventsPage({ events }) {
  const router = useRouter();

  function findEvents(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }
  return (
    <div>
      <Head>
        <title>{events.title}</title>
        <meta name="description" content={events.description} />
      </Head>
      <EventsSearch onSearch={findEvents} />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  console.log(events);

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
