export interface MeetupEvent {
  title: string;
  shortUrl: string;
  venue: {
    name: string;
    address: string;
    city: string;
    state: string;
  };
  dateTime: string;
  going: number;
}
interface MeetupGroupByUrlname {
  link: string;
  memberships: {
    count: number;
  };
  upcomingEvents: {
    edges: Array<{
      node: MeetupEvent;
    }>;
  };
}

export interface MeetupGroupResponse {
  data: {
    groupByUrlname: MeetupGroupByUrlname;
  };
}
