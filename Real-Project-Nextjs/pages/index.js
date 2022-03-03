import { MongoClient } from "mongodb";
import MetaHead from "../components/layout/MetaHead";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <>
      <MetaHead
        title="React Meetups"
        content="Browse a huge list of highly active React meetups!"
      />
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// Server Side Rendering is better for pages where data is constantly changing
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://joyceUser:cse490Nextjs@cluster0.diolm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // number of seconds data changes so that it 'revalidates'
    revalidate: 1,
  };
}

export default HomePage;
