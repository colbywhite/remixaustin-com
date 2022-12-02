import type { MeetupEvent } from "~/models/meetup";
import { DateTime } from "luxon";
import MeetupIcon from "~/components/icons/MeetupIcon";

const DEFAULT_VENUE: MeetupEvent["venue"] = {
  name: "H-E-B Digital & Favor Eastside Tech Hub (and online)",
  address: "2416 E 6th St",
  city: "Austin",
  state: "TX",
};

function isEmptyString(val: string): boolean {
  return val !== undefined && val.trim().length <= 0;
}

function isUndefinedVenue(venue: MeetupEvent["venue"]): boolean {
  return (
    isEmptyString(venue.address) ||
    isEmptyString(venue.city) ||
    isEmptyString(venue.state)
  );
}
export interface NextEventCardProps {
  event: MeetupEvent;
}

export default function NextEventCard({ event }: NextEventCardProps) {
  const date = DateTime.fromISO(event.dateTime);
  const venue = isUndefinedVenue(event.venue) ? DEFAULT_VENUE : event.venue;
  return (
    <>
      <a
        href={event.shortUrl}
        className="btn-primary btn mb-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="mr-2">
          Come join {event.going} others at our next meetup!
        </span>
        <MeetupIcon />
      </a>
      <p className="text-xl font-bold">{event.title}</p>
      <p>
        <time dateTime={event.dateTime}>
          {date.toFormat("ccc, LLL d")}, {date.toFormat("t ZZZZ")}
        </time>
      </p>
      <p>{venue.name}</p>
      <p>
        {venue.address}, {venue.city}, {venue.state}
      </p>
    </>
  );
}
