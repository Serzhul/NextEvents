import React, { Fragment } from "react";
import { getAllEvents, getEventById } from "../../components/helpers/api";
import EventContent from "../../components/event-detail/event-content";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import ErrorAlert from "../../components/ui/error-alert";

export default function EventDetailPage({ selectedEvent }) {
  const event = selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <div>
      <Fragment>
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
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
