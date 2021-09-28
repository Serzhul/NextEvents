import React from "react";
import EventItem from "./EventItem";
import styles from "./EventList.module.css";

export default function EventList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          image={event.image}
          location={event.location}
          date={event.date}
        ></EventItem>
      ))}
    </ul>
  );
}
