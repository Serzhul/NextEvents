import Head from "next/head";
import React, { Fragment } from "react";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "../../components/helpers/api";
import EventContent from "../../components/event-detail/event-content";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import ErrorAlert from "../../components/ui/error-alert";
import Comments from "../../components/input/comments";

export default function EventDetailPage({ selectedEvent }) {
  const event = selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loadig...</p>
      </div>
    );
  }

  return (
    <div>
      <Fragment>
        <Head>
          <title>NextJS Events</title>
          <meta name="description" content="Find a lot of great events" />
        </Head>
        <EventSummary title={event.title}></EventSummary>
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
        <Comments eventId={event.id} />
      </Fragment>
    </div>
  );
}

export async function getStaticProps(context) {
  const { eventId } = context.params;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
