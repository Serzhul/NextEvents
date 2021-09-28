import styles from "./EventItem.module.css";
import Link from "next/link";
import React from "react";
import Button from "../ui/button";
import DateIcon from "../icons/DateIcon";
import AddressIcon from "../icons/AddressIcon";
import ArrowrightIcon from "../icons/ArrowRightIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

export default function EventItem({ title, image, date, location, id }) {
  const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(",", "\n");
  const detailLink = `/events/${id}`;

  return (
    <li className={styles.item}>
      <img src={"/" + image} alt="" />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={detailLink}>
            <span> Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
