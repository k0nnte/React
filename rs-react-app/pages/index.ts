import Main from './../src/other/main';

export default Main;

export async function getServerSideProps(context: {
  query: { search?: string; deteils?: string };
}) {
  return {
    redirect: {
      destination: `/1?search=${context.query.search || ''}&deteils=${context.query.deteils || ''}`,
      permanent: false,
    },
  };
}
