const Main = () => {
  return null;
};

export default Main;

// eslint-disable-next-line react-refresh/only-export-components
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
