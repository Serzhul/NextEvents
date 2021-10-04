import Head from "next/head";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../components/helpers/api";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

export default function FilteredEventPage({ hasError, events, date }) {
  const router = useRouter();
  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${date.month}/${date.year}.`}
      />
    </Head>
  );

  if (hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // const events = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });

  if (!events || events.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const formattedDate = new Date(date.year, date.month - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={formattedDate} />
      <EventList items={events}></EventList>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    };
  }

  const events = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
