import { MongoClient, ObjectId } from "mongodb";
import MetaHead from "../../components/layout/MetaHead";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails({ meetupData }) {
  return (
    <>
      <MetaHead title={meetupData.title} content={meetupData.description} />
      <MeetupDetail {...meetupData} />
    </>
  );
}

export async function getStaticPaths() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://joyceUser:cse490Nextjs@cluster0.diolm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    // fallback false means all supported paths are defined
    // true or blocking means that it will generate page on demand
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://joyceUser:cse490Nextjs@cluster0.diolm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  return {
    props: {
      meetupData: { ...selectedMeetup, _id: selectedMeetup._id.toString() },
    },
  };
}

export default MeetupDetails;
