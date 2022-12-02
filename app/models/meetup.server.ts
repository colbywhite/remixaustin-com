import type { MeetupGroupResponse } from "~/models/meetup";

const REMIX_AUSTIN_MEETUP_URL = "remix-austin";
const MEETUP_API = "https://www.meetup.com/gql";
const JSON_HEADERS: HeadersInit = { Accept: "application/json" };

// TODO use gql utils for typing
const GET_GROUP_QUERY = `
  query($urlname: String!) {
   groupByUrlname(urlname: $urlname) {
    link
    memberships {
     count
    }
    upcomingEvents(input: {first: 1}){
     edges {
      node {
       title
       shortUrl
       venue {
        name
        address
        city
        state
       }
       dateTime
       going
      }
     }
    }
   }
  }
`;

async function getMeetupGroupInfo(url: string) {
  const body = { variables: { urlname: url }, query: GET_GROUP_QUERY };
  return fetch(MEETUP_API, {
    method: "POST",
    body: JSON.stringify(body),
    headers: JSON_HEADERS,
  }).then((res) => res.json() as Promise<MeetupGroupResponse>);
}

export async function getRemixAustinInfo() {
  return getMeetupGroupInfo(REMIX_AUSTIN_MEETUP_URL).then(
    (res) => res.data.groupByUrlname
  );
}
